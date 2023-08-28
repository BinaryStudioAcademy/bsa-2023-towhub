import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import { Button } from '../button/button.jsx';
import { DEFAULT_LENGTH } from './libs/constant.js';
import styles from './styles.module.scss';

type Properties = {
  pagesRange: number;
  paginationLength?: number;
  onClick: (n: number) => void;
};

const Pagination: React.FC<Properties> = ({
  pagesRange,
  paginationLength = pagesRange > DEFAULT_LENGTH ? DEFAULT_LENGTH : pagesRange,
  onClick,
}: Properties) => {
  const [currentPage, setCurrentPage] = useState(1);
  const middleValue = Math.floor((paginationLength - 1) / 2);

  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === pagesRange;

  const isHiddenFirstPage =
    currentPage >= paginationLength && paginationLength < pagesRange;
  const isHiddenLastPage =
    currentPage + middleValue < pagesRange && paginationLength < pagesRange;

  const handlePageClick = useCallback(
    (event_: React.MouseEvent) => {
      const target = event_.target as HTMLButtonElement;

      if (target.textContent) {
        const index = +target.textContent;
        onClick(index - 1);
        setCurrentPage(index);
      }
    },
    [onClick],
  );
  const handlePreviousClick = useCallback(() => {
    onClick(currentPage - 2);
    setCurrentPage((currentPage) => currentPage - 1);
  }, [currentPage, onClick]);

  const handleNextClick = useCallback(() => {
    onClick(currentPage);
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
            {index}
          </button>,
        );
      }

      return buttons;
    },
    [handlePageClick, currentPage],
  );

  const showButtons = (): JSX.Element[] => {
    let startIndex = currentPage - middleValue;
    const endIndex = currentPage + middleValue;

    if (currentPage < paginationLength) {
      startIndex = 1;

      return createButtons(startIndex, paginationLength);
    }

    if (startIndex + paginationLength > pagesRange) {
      startIndex = pagesRange - paginationLength + 1;

      return createButtons(startIndex, pagesRange);
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
