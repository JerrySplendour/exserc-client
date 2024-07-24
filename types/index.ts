import { Dispatch, SetStateAction } from "react";

export interface TreeNode {
    id: number;
    name: string;
    parentId: number;
    children?: TreeNode[];
}
  
export interface TreeDropdownProps {
    data: TreeNode[];
}
  
export interface ListProps {
    items: TreeNode[];
    setSelected: Dispatch<SetStateAction<string>>
}

export interface ListItemProps {
    item: TreeNode;
    setSelected: Dispatch<SetStateAction<string>>
  }
  