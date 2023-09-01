import { filesize } from 'filesize';

// import { type FieldValues } from 'react-hook-form';
import { Icon } from '~/libs/components/icon/icon.js';
import { IconName } from '~/libs/enums/icon-name.enum.js';
import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { type ValueOf } from '~/libs/types/types.js';
import { FileStatus } from '~/slices/files/files.js';

import styles from './styles.module.scss';

type Properties = {
  file: File;
  fileStatus?: ValueOf<typeof FileStatus>; // 'Chosen' | 'Uploading' | 'Uploaded' | 'Rejected'
};

const ChosenFilePreview = ({
  file,
  fileStatus = FileStatus.CHOSEN,
}: Properties): JSX.Element => {
  const { name, size } = file;

  return (
    <div className={styles.row}>
      <div className={styles.rowContent}>
        <Icon className={styles.textMd} iconName={IconName.FILE} />
        <div className={styles.rowContentDetails}>
          <span className={styles.rowContentName}>
            {name} • {fileStatus}
          </span>
          <span className={styles.textSm}>{filesize(size)}</span>
        </div>
      </div>
      <Icon
        className={getValidClassNames(styles.rowIcon, styles.textLg)}
        iconName={IconName.CHECK}
      />
    </div>
  );
};

export { ChosenFilePreview };
