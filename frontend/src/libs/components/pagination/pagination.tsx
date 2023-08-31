import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback } from '~/libs/hooks/hooks.js';

import { Button } from '../button/button.jsx';
import { DEFAULT_SIZE } from './libs/constant.js';
import { getMiddle } from './libs/helper.js';
import styles from './styles.module.scss';

type Properties = {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  size?: number;
  onClick: (n: number) => void;
  onChangePageSize: (n: number) => void;
};

const Pagination: React.FC<Properties> = ({
  pageCount,
  pageIndex,
  pageSize,
  size = pageCount > DEFAULT_SIZE ? DEFAULT_SIZE : pageCount,
  onClick,
  onChangePageSize,
}: Properties) => {
  const middleValue = getMiddle(size);

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === pageCount - 1;

  const isHiddenFirstPage =
    pageIndex >= size - 1 && size < pageCount && pageIndex > 0;

  const isHiddenLastPage =
    pageIndex + middleValue < pageCount - 1 && size < pageCount;

  const handlePageClick = useCallback(
    (event_: React.MouseEvent) => {
      const target = event_.target as HTMLButtonElement;

      if (target.textContent) {
        const index = +target.textContent - 1;
        onClick(index);
      }
    },
    [onClick],
  );

  const handleChangePageSize = useCallback(
    (event_: React.ChangeEvent) => {
      const target = event_.target as HTMLSelectElement;
      const value = +target.value;
      onChangePageSize(value);
    },
    [onChangePageSize],
  );

  const handlePreviousClick = useCallback(() => {
    onClick(pageIndex - 1);
  }, [onClick, pageIndex]);

  const handleNextClick = useCallback(() => {
    onClick(pageIndex + 1);
  }, [onClick, pageIndex]);

  const createButtons = useCallback(
    (startIndex: number, endIndex: number) => {
      const buttons: JSX.Element[] = [];

      for (let index = startIndex; index <= endIndex; index++) {
        const buttonClass = getValidClassNames(styles.btn, {
          [styles.active]: index === pageIndex,
        });
        buttons.push(
          <button className={buttonClass} onClick={handlePageClick} key={index}>
            {index + 1}
          </button>,
        );
      }

      return buttons;
    },
    [handlePageClick, pageIndex],
  );

  const showButtons = (): JSX.Element[] => {
    let startIndex = pageIndex - middleValue;
    let endIndex = pageIndex + middleValue;

    if (startIndex + size > pageCount - 1) {
      startIndex = pageCount - size;
      endIndex = pageCount - 1;
    }

    if (pageIndex < size - 1) {
      startIndex = 0;
      endIndex = size - 1;
    }

    return createButtons(startIndex, endIndex);
  };

  const createPageSizeOptions = (): JSX.Element[] => {
    const options: JSX.Element[] = [];
    for (let index = 1; index < 5; index++) {
      const value = pageSize * index;
      options.push(<option value={value}>{value}</option>);
    }

    return options;
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <Button
          label="Prev"
          size="sm"
          onClick={handlePreviousClick}
          isDisabled={isFirstPage}
        />
        {isHiddenFirstPage ? <div className={styles.dots}>...</div> : null}
        {showButtons()}
        {isHiddenLastPage ? <div className={styles.dots}>...</div> : null}
        <Button
          label="Next"
          size="sm"
          onClick={handleNextClick}
          isDisabled={isLastPage}
        />
      </div>
      <div className={styles.size}>
        <label htmlFor="pageSize">Page size:</label>
        <select
          name="pageSize"
          onChange={handleChangePageSize}
          className={styles.select}
        >
          {createPageSizeOptions()}
        </select>
      </div>
    </div>
  );
};

export { Pagination };
