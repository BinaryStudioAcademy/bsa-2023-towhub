const EDIT_ICON_POSITION_FROM_RIGHT = 2;
const DELETE_ICON_POSITION_FROM_RIGHT = 1;

type Arguments = {
  isTableEditable: boolean;
  index: number;
  totalCellsInRow: number;
};

type CheckIsIconCell = {
  isEditCell: boolean;
  isDeleteCell: boolean;
};

const checkIsActionCell = ({
  isTableEditable,
  index,
  totalCellsInRow,
}: Arguments): CheckIsIconCell => {
  return {
    isEditCell:
      isTableEditable &&
      index === totalCellsInRow - EDIT_ICON_POSITION_FROM_RIGHT,
    isDeleteCell:
      isTableEditable &&
      index === totalCellsInRow - DELETE_ICON_POSITION_FROM_RIGHT,
  };
};

export { checkIsActionCell };
