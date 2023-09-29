type ReturnValue = {
  pageSize: number;
  pageIndex: number;
  changePageSize: React.Dispatch<React.SetStateAction<number>>;
  changePageIndex: React.Dispatch<React.SetStateAction<number>>;
  updatePage: () => void;
};

export { type ReturnValue };
