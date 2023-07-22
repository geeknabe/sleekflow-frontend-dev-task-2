import { useEffect } from 'react';
import { nanoid } from 'nanoid';

/**
 * Adds a unique key to the given array of objects.
 * @param {[Object]} items - Array of objects.
 * @returns
 */
const addKeys = (items) => items.map((item) => ({ ...item, key: nanoid() }));

/**
 * Informs if a click outside the given ref is done.
 * @param {array} refArray - Array of component refs to avoid
 * @param {func} callback - A callback function to run if user clicked outside the array of
 *  components
 */
const useOutsideClick = (refArray, callback) => {
  const handleOutsideClick = (event) => {
    let outsideClick = false;

    if (!(Array.isArray(refArray) && refArray.length > 0)) {
      console.log('Please pass in an array of refs.');
    }

    refArray.forEach((ref) => {
      if (ref.current && !ref.current.contains(event.target)) {
        if (refArray.length > 1) {
          refArray
            .filter((refPrime) => {
              if (ref === refPrime) {
                return false;
              }
              return true;
            })
            .forEach((refPrime) => {
              if (!refPrime.current.contains(event.target)) {
                outsideClick = true;
              }
            });
        } else {
          outsideClick = true;
        }
      }
    });

    if (outsideClick) {
      callback(event);
    }
  };

  useEffect(() => {
    if (typeof document !== 'undefined') {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      if (typeof document !== 'undefined') {
        document.removeEventListener('mousedown', handleOutsideClick);
      }
    };
  }, []);
};

export { addKeys, useOutsideClick };
