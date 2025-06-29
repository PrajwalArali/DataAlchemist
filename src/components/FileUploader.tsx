"use client";

import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";
import Papa from "papaparse";
import * as XLSX from "xlsx";
import { EntityType } from "@/types/entities";

interface FileUploaderProps {
  onFilesParsed: (entity: string, data: EntityType[]) => void;
}

export default function FileUploader({ onFilesParsed }: FileUploaderProps) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    acceptedFiles.forEach((file) => {
      const reader = new FileReader();
      const ext = file.name.split(".").pop()?.toLowerCase();
      const baseName = file.name.split(".")[0].toLowerCase();

      reader.onload = (e) => {
        const content = e.target?.result;
        if (!content) return;

        if (ext === "csv") {
          const parsed = Papa.parse(content as string, {
            header: true,
            skipEmptyLines: true,
          });
          onFilesParsed(baseName, parsed.data as EntityType[]);
        } else if (ext === "xlsx") {
          const workbook = XLSX.read(content, { type: "binary" });
          const sheet = workbook.Sheets[workbook.SheetNames[0]];
          const data = XLSX.utils.sheet_to_json(sheet);
          onFilesParsed(baseName, data as EntityType[]);
        }
      };

      reader.readAsBinaryString(file);
    });
  }, [onFilesParsed]);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      {...getRootProps()}
      className="cursor-pointer border-2 border-dashed border-gray-400 rounded-lg p-6 text-center text-gray-600 hover:bg-gray-100 transition"
    >
      <input {...getInputProps()} />
      <p className="text-lg"> Drag & drop files here, or click to upload</p>
      <p className="text-sm text-gray-400 mt-2">Accepted: CSV/XLSX</p>
    </div>
  );
}
