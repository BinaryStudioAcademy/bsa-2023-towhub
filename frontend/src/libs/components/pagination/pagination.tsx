import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import { Button } from '../button/button.jsx';
import { DEFAULT_SIZE } from './libs/constant.js';
import { getMiddle } from './libs/helper.js';
import styles from './styles.module.scss';

type Properties = {
  pageCount: number;
  size?: number;
  onClick: (n: number) => void;
};

const Pagination: React.FC<Properties> = ({
  pageCount,
  size = pageCount > DEFAULT_SIZE ? DEFAULT_SIZE : pageCount,
  onClick,
}: Properties) => {
  const [currentPage, setCurrentPage] = useState(0);
  const middleValue = getMiddle(size);

  const isFirstPage = currentPage === 0;
  const isLastPage = currentPage === pageCount - 1;

  const isHiddenFirstPage =
    currentPage >= size - 1 && size < pageCount && currentPage > 0;

  const isHiddenLastPage =
    currentPage + middleValue < pageCount - 1 && size < pageCount;

  const handlePageClick = useCallback(
    (event_: React.MouseEvent) => {
      const target = event_.target as HTMLButtonElement;

      if (target.textContent) {
        const index = +target.textContent - 1;
        onClick(index);
        setCurrentPage(index);
      }
    },
    [onClick],
  );
  const handlePreviousClick = useCallback(() => {
    onClick(currentPage - 1);
    setCurrentPage((currentPage) => currentPage - 1);
  }, [currentPage, onClick]);

  const handleNextClick = useCallback(() => {
    onClick(currentPage + 1);
    setCurrentPage((currentPage) => currentPage + 1);
  }, [currentPage, onClick]);

  const createButtons = useCallback(
    (startIndex: number, endIndex: number) => {
      const buttons: JSX.Element[] = [];

      for (let index = startIndex; index <= endIndex; index++) {
        const buttonClass = getValidClassNames(styles.btn, {
          [styles.active]: index === currentPage,
        });
        buttons.push(
          <button className={buttonClass} onClick={handlePageClick} key={index}>
            {index + 1}
          </button>,
        );
      }

      return buttons;
    },
    [handlePageClick, currentPage],
  );

  const showButtons = (): JSX.Element[] => {
    let startIndex = currentPage - middleValue;
    let endIndex = currentPage + middleValue;

    if (startIndex + size > pageCount - 1) {
      startIndex = pageCount - size;
      endIndex = pageCount - 1;
    }

    if (currentPage < size - 1) {
      startIndex = 0;
      endIndex = size - 1;
    }

    return createButtons(startIndex, endIndex);
  };

  return (
    <div className={styles.container}>
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
  );
};

export { Pagination };
