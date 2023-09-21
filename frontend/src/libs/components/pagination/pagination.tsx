import { type SingleValue } from 'react-select';

import { useCallback } from '~/libs/hooks/hooks.js';
import { type SelectOption } from '~/libs/types/select-option.type.js';

import { Button } from '../button/button.jsx';
import { Dropdown } from '../dropdown/dropdown.js';
import { DEFAULT_SIZE } from './libs/constant.js';
import {
  convertToIndex,
  convertToNumber,
  createOption,
  createOptions,
  getMiddle,
} from './libs/helpers.js';
import styles from './styles.module.scss';

type Properties = {
  pageCount: number;
  pageIndex: number;
  pageSize: number;
  paginationSize?: number;
  onClick: (n: number) => void;
  onChangePageSize?: (n: number) => void;
};

const Pagination: React.FC<Properties> = ({
  pageCount,
  pageIndex,
  pageSize,
  paginationSize = pageCount > DEFAULT_SIZE ? DEFAULT_SIZE : pageCount,
  onClick,
  onChangePageSize,
}: Properties) => {
  const middleValue = getMiddle(paginationSize);

  const isFirstPage = pageIndex === 0;
  const isLastPage = pageIndex === convertToIndex(pageCount);

  const isHiddenFirstPage =
    pageIndex >= convertToIndex(paginationSize) &&
    paginationSize < pageCount &&
    pageIndex > 0;

  const isHiddenLastPage =
    pageIndex + middleValue <= convertToIndex(pageCount) &&
    paginationSize < pageCount;

  const handlePageClick = useCallback(
    (event_: React.MouseEvent) => {
      const target = event_.target as HTMLButtonElement;

      if (target.textContent) {
        const index = convertToIndex(+target.textContent);
        onClick(index);
      }
    },
    [onClick],
  );

  const handleChangePageSize = useCallback(
    (option: SingleValue<SelectOption>) => {
      if (option?.value && !Number.isNaN(+option.value) && onChangePageSize) {
        onChangePageSize(+option.value);
      }
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
        buttons.push(
          <Button
            key={index}
            className={styles.btn}
            label={`${convertToNumber(index)}`}
            variant={index === pageIndex ? 'outlined' : 'text'}
            onClick={handlePageClick}
          ></Button>,
        );
      }

      return buttons;
    },
    [handlePageClick, pageIndex],
  );

  const showButtons = (): JSX.Element[] => {
    let startIndex = pageIndex - middleValue;
    let endIndex = pageIndex + middleValue;
    const lastPageIndex = convertToIndex(pageCount);
    const lastPaginationIndex = convertToIndex(paginationSize);

    if (startIndex + paginationSize > lastPageIndex) {
      startIndex = pageCount - paginationSize;
      endIndex = lastPageIndex;
    }

    if (pageIndex < lastPaginationIndex) {
      startIndex = 0;
      endIndex = lastPaginationIndex;
    }

    return createButtons(startIndex, endIndex);
  };

  return (
    <div className={styles.container}>
      <div className={styles.pagination}>
        <Button
          className={styles['text-btn']}
          label="Prev"
          size="sm"
          variant="text"
          onClick={handlePreviousClick}
          isDisabled={isFirstPage}
        />
        {isHiddenFirstPage && (
          <>
            <Button
              className={styles.btn}
              label="1"
              variant="text"
              onClick={handlePageClick}
            ></Button>
            <div className={styles.dots}>...</div>
          </>
        )}
        {showButtons()}
        {isHiddenLastPage && (
          <>
            <div className={styles.dots}>...</div>
            <Button
              className={styles.btn}
              label={pageCount}
              variant="text"
              onClick={handlePageClick}
            ></Button>
          </>
        )}
        <Button
          className={styles['text-btn']}
          label="Next"
          size="sm"
          variant="text"
          onClick={handleNextClick}
          isDisabled={isLastPage}
        />
      </div>
      {onChangePageSize && (
        <div className={styles.size}>
          <label htmlFor="pageSize">Page size:</label>
          <Dropdown
            className={styles.dropdown}
            options={createOptions([5, 10, 20, 50, 100])}
            defaultValue={createOption(pageSize)}
            isCustomValueContainer
            onChange={handleChangePageSize}
          />
        </div>
      )}
    </div>
  );
};

export { Pagination };
