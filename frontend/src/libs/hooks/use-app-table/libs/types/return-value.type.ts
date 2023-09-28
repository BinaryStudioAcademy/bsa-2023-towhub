type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  onChangePageSize: React.Dispatch<React.SetStateAction<number>>;
  onChangePageIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePage: () => void;
};

export { type ReturnValue };
