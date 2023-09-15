import { type FileObject } from '~/libs/components/file-input/libs/types/types.js';
import { Icon } from '~/libs/components/icon/icon.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import { filesize, getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useEffect, useState } from '~/libs/hooks/hooks.js';
import { type ValueOf } from '~/libs/types/types.js';
import { FileStatus } from '~/slices/files/files.js';

import { DELETE_TIME_OFFSET } from './libs/constants/constants.js';
import styles from './styles.module.scss';

type Properties = {
  file: FileObject;
  fileStatus?: ValueOf<typeof FileStatus>;
  handleDeleteFile: (id: string) => void;
};

const ChosenFilePreview = ({
  file,
  fileStatus = FileStatus.CHOSEN,
  handleDeleteFile,
}: Properties): JSX.Element => {
  const { name, size, id } = file;

  const [actionIconName, setActionIconName] = useState<
    ValueOf<typeof IconName>
  >(IconName.CHECK);

  const handleMouseEnter = useCallback(() => {
    setActionIconName(IconName.XMARK);
  }, [setActionIconName]);

  const handleMouseLeave = useCallback(() => {
    setActionIconName(IconName.CHECK);
  }, [setActionIconName]);

  const [beforeDeletionState, setBeforeDeletionState] = useState(false);

  useEffect(() => {
    if (beforeDeletionState) {
      const zoomOutSpeed = Number.parseInt(styles['zoom-out-speed']);
      const deletionTimeout = zoomOutSpeed - DELETE_TIME_OFFSET;
      setTimeout(() => handleDeleteFile(id), deletionTimeout);
    }
  }, [beforeDeletionState, handleDeleteFile, name, id]);

  const handleClick = useCallback(
    (event: React.MouseEvent<HTMLButtonElement>): void => {
      event.preventDefault();
      setBeforeDeletionState(true);
    },
    [setBeforeDeletionState],
  );

  return (
    <div
      className={getValidClassNames(
        styles.row,
        beforeDeletionState && styles.rowBeforeDeletion,
      )}
    >
      <div className={styles.rowContent}>
        <Icon className={styles.textMd} iconName={IconName.FILE} />
        <div className={styles.rowContentDetails}>
          <span className={styles.rowContentName}>
            {name} • {fileStatus}
          </span>
          <span className={styles.textSm}>{filesize(size)}</span>
        </div>
      </div>
      <button
        className={styles.rowActionButton}
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        onClick={handleClick}
      >
        <Icon
          className={getValidClassNames(styles.rowIcon, styles.textLg)}
          iconName={actionIconName}
        />
      </button>
    </div>
  );
};

export { ChosenFilePreview };
