import { checkIsActionCell } from './check-is-action-cell.helper.js';

type Arguments = {
  index: number;
  totalCellsInRow: number;
  isTableEditable: boolean;
  onEditClick?: (rowId: string) => void;
  onDeleteClick?: (rowId: string) => void;
};

const getCellClickHandler = ({
  index,
  totalCellsInRow,
  isTableEditable = false,
  onEditClick,
  onDeleteClick,
}: Arguments): typeof onEditClick | typeof onDeleteClick => {
  if (!isTableEditable) {
    return;
  }
  const { isEditCell } = checkIsActionCell({
    isTableEditable,
    index,
    totalCellsInRow,
  });

  if (isEditCell) {
    return onEditClick;
  }

  return onDeleteClick;
};

export { getCellClickHandler };
