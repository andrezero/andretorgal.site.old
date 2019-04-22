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

export interface FileContents {
  data: any;
  abstract: string;
  content: string;
}
