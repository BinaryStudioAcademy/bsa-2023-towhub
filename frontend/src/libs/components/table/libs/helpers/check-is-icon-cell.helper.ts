const EDIT_ICON_POSITION_FROM_RIGHT = 2;
const DELETE_ICON_POSITION_FROM_RIGHT = 1;

type CheckIsIconCell = {
  isEditCell: boolean;
  isDeleteCell: boolean;
};

const checkIsIconCell = (
  isTableEditable: boolean,
  index: number,
  arrayLength: number,
): CheckIsIconCell => {
  return {
    isEditCell:
      isTableEditable && index === arrayLength - EDIT_ICON_POSITION_FROM_RIGHT,
    isDeleteCell:
      isTableEditable &&
      index === arrayLength - DELETE_ICON_POSITION_FROM_RIGHT,
  };
};

export { checkIsIconCell };
