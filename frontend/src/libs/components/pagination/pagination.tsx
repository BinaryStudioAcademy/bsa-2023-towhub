import { getValidClassNames } from '~/libs/helpers/helpers.js';
import { useCallback, useState } from '~/libs/hooks/hooks.js';

import { Button } from '../button/button.jsx';
import styles from './styles.module.scss';

type Properties = {
  pagesRange: number;
  paginationLength?: number;
  onClick: (n: number) => void;
};

const Pagination: React.FC<Properties> = ({
  pagesRange,
  paginationLength = pagesRange > 5 ? 5 : pagesRange,
  onClick,
}: Properties) => {
  const [currentPage, setCurrentPage] = useState(1);
  const middleValue = Math.floor((paginationLength - 1) / 2);

  const handlePageClick = useCallback(
    (event_: React.MouseEvent) => {
      const target = event_.target as HTMLButtonElement;
      const index = target.textContent;

      if (index) {
        onClick(+index - 1);
        setCurrentPage((currentPage) => (index ? +index : currentPage));
      }
    },
    [onClick],
  );
  const handlePreviousClick = useCallback(() => {
    onClick(+currentPage - 2);
    setCurrentPage((currentPage) => currentPage - 1);
  }, [currentPage, onClick]);

  const handleNextClick = useCallback(() => {
    onClick(+currentPage);
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
    const startIndex = currentPage - middleValue;
    const endIndex = currentPage + middleValue;

    if (currentPage < paginationLength) {
      return createButtons(1, paginationLength);
    }

    if (startIndex + paginationLength > pagesRange) {
      return createButtons(pagesRange - paginationLength + 1, pagesRange);
    }

    return createButtons(startIndex, endIndex);
  };

  return (
    <div className={styles.container}>
      <Button
        label="Prev"
        size="sm"
        onClick={handlePreviousClick}
        isDisabled={currentPage === 1}
      />
      {currentPage >= paginationLength && paginationLength < pagesRange ? (
        <div className={styles.dots}>...</div>
      ) : null}
      {showButtons()}
      {currentPage + middleValue < pagesRange &&
      paginationLength < pagesRange ? (
        <div className={styles.dots}>...</div>
      ) : null}
      <Button
        label="Next"
        size="sm"
        onClick={handleNextClick}
        isDisabled={currentPage === pagesRange}
      />
    </div>
  );
};

export { Pagination };
