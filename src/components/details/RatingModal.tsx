import React, { useEffect, useRef, useState } from "react";
import { Follow, Rating, User } from "../../types";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../redux/Store";
import { updateUserThunk } from "../../services/usersThunks";
import { Link } from "react-router-dom";
import {
  createRating,
  deleteRating,
  updateRating,
} from "../../services/ratingsServices";

interface RatingModalProps {
  itemType: string;
  itemId: number;
  rating: Rating;
  updateRatings: (rating: Rating) => void;
  removeRating: (rating: Rating) => void;
}

const RatingModal: React.FC<RatingModalProps> = ({
  itemType,
  itemId,
  rating,
  updateRatings,
  removeRating,
}) => {
  const [modalRating, setModalRating] = useState<Rating>(rating);
  const [newRating, setNewRating] = useState<number>(rating.rating);
  const closeModalRef = useRef<HTMLButtonElement>(null);

  const ratingChangeHandler = (e: any) => {
    // console.log(e.target.value)
    setNewRating(e.target.value);
  };

  const handleRatingUpdate = () => {
    if (modalRating.isNew)
      createRating({ ...modalRating, rating: newRating }).then(() => {
        updateRatings({ ...modalRating, rating: newRating });
        setModalRating({ ...modalRating, isNew: false });
      });
    else
      updateRating({ ...modalRating, rating: newRating }).then(() => {
        updateRatings({ ...modalRating, rating: newRating });
      });
    if (closeModalRef.current) closeModalRef.current.click();
    // updateRatings({...rating, rating: newRating});
  };

  const handleRatingDelete = () => {
    if (!modalRating.isNew)
      deleteRating(modalRating).then(() => {
        removeRating(modalRating);
        setNewRating(0);
        setModalRating({ ...modalRating, isNew: true });
        if (closeModalRef.current) closeModalRef.current.click();
      });
  };

  return (
    <>
      <div
        className="modal fade"
        id="ratingModal"
        tabIndex={-1}
        aria-labelledby="ratingModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5 text-black" id="ratingModalLabel">
                Rating
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
                ref={closeModalRef}
              ></button>
            </div>
            <div className="modal-body text-black">
              <label className="form-label" htmlFor="customRange1">
                <h3 className="text-success">{Number(newRating).toFixed()}</h3>
              </label>
              <div className="range">
                <input
                  type="range"
                  value={newRating}
                  className="form-range"
                  id="customRange1"
                  onChange={ratingChangeHandler}
                />
              </div>
            </div>
            <div className="modal-footer">
              {/* <small className="text-success">{message}</small> */}
              <button
                type="button"
                className="btn btn-danger"
                onClick={handleRatingDelete}
              >
                Delete Rating
              </button>
              <button
                type="button"
                className="btn btn-success"
                onClick={handleRatingUpdate}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default RatingModal;
