export interface FileSysNode {
  type: string;
  name: string;
  path: string;
  filename: string;
  contents: string;
  created: Date;
}

export interface FileNode extends FileSysNode {
  type: 'file';
}

export interface DirectoryNode extends FileSysNode {
  type: 'dir';
  hasIndex: boolean;
  children: FileSysNode[];
}

export interface FileData {
  [key: string]: any;
}

export interface ParsedFile {
  filename: string;
  name: string;
  path: string;
  data: FileData;
  abstract: string;
  content: string;
  created: Date;
}
