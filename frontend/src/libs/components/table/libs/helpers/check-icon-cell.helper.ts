const EDIT_ICON_POSITION_FROM_RIGHT = 2;
const DELETE_ICON_POSITION_FROM_RIGHT = 1;

type Return = {
  isEditCell: boolean;
  isDeleteCell: boolean;
};

const checkIconCell = (index: number, arrayLength: number): Return => {
  return {
    isEditCell: index === arrayLength - EDIT_ICON_POSITION_FROM_RIGHT,
    isDeleteCell: index === arrayLength - DELETE_ICON_POSITION_FROM_RIGHT,
  };
};

export { checkIconCell };
