import { checkIsActionCell } from './check-is-action-cell.helper.js';

type Parameters = {
  index: number;
  arrayLength: number;
  isTableEditable: boolean;
  onEditClick?: (rowId: string) => void;
  onDeleteClick?: (rowId: string) => void;
};

const getCellClickHandler = ({
  index,
  arrayLength,
  isTableEditable = false,
  onEditClick,
  onDeleteClick,
}: Parameters): typeof onEditClick | typeof onDeleteClick => {
  if (!isTableEditable) {
    return;
  }
  const { isEditCell } = checkIsActionCell(isTableEditable, index, arrayLength);

  if (isEditCell) {
    return onEditClick;
  }

  return onDeleteClick;
};

export { getCellClickHandler };
