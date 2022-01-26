import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { ITINIAL_RATING } from '../../const';
import { postReview } from '../../store/api-actions';
import { Guitar } from '../../types/guitar';
import { useDispatch } from 'react-redux';

type ModalReviewProps = {
  product: Guitar,
  handleModalClose: () => void,
  handleModalOpen: () => void,
};

function ModalReview(props: ModalReviewProps): JSX.Element {
  const dispatch = useDispatch();

  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(ITINIAL_RATING);
  const [userName, setUserName] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [advantage, setAdvantage] = useState('');
  const [disadvantage, setDisadvantage] = useState('');

  useEffect(() => {
    if (rating === ITINIAL_RATING || !userName.length) {
      setIsValid(false);
    } else {
      setIsValid(true);
    }
  }, [rating, userName]);

  const handleRatingChange = (evt: ChangeEvent<HTMLInputElement>) => {
    setRating(evt.target.value);
  };

  const handleCommentInput = (evt: ChangeEvent<HTMLTextAreaElement>) => {
    setComment(evt.target.value);
  };

  const handleUserNameInput = (evt: { target: { value: SetStateAction<string>; }; }) => {
    setUserName(evt.target.value);
  };

  const handleAdvantageInput = (evt: { target: { value: SetStateAction<string>; }; }) => {
    setAdvantage(evt.target.value);
  };

  const handleDisadvantageInput = (evt: { target: { value: SetStateAction<string>; }; }) => {
    setDisadvantage(evt.target.value);
  };

  const handleFormSubmit = (evt: { preventDefault: () => void; }) => {
    evt.preventDefault();
    dispatch(postReview({
      userName: userName,
      comment: comment,
      rating: +rating,
      guitarId: props.product.id,
      advantage: advantage,
      disadvantage: disadvantage,
    }));
    props.handleModalClose();
    props.handleModalOpen();
  };

  return (
    <div
      style={{
        position: 'absolute',
        width: '550px',
        height: '610px',
        marginBottom: '50px',
      }}
    >
      <div className="modal is-active modal--review modal-for-ui-kit">
        <div className="modal__wrapper">
          <div className="modal__overlay" data-close-modal onClick={props.handleModalClose}></div>
          <div className="modal__content">
            <h2 className="modal__header modal__header--review title title--medium">Оставить отзыв</h2>
            <h3 className="modal__product-name title title--medium-20 title--uppercase">{props.product.name}</h3>
            <form className="form-review" onSubmit={handleFormSubmit}>
              <div className="form-review__wrapper">
                <div className="form-review__name-wrapper">
                  <label className="form-review__label form-review__label--required" htmlFor="user-name">Ваше Имя</label>
                  <input className="form-review__input form-review__input--name" id="user-name" type="text" autoComplete="off" tabIndex={1} value={userName} onChange={handleUserNameInput}></input>
                  {!isValid && <span className="form-review__warning">Заполните поле</span>}
                </div>
                <div><span className="form-review__label form-review__label--required">Ваша Оценка</span>
                  <div className="rate rate--reverse">
                    <input className="visually-hidden" type="radio" id="star-5" name="rate" value="5" tabIndex={2} onChange={handleRatingChange} checked={rating === '5'}></input>
                    <label className="rate__label" htmlFor="star-5" title="Отлично"></label>
                    <input className="visually-hidden" type="radio" id="star-4" name="rate" value="4" tabIndex={2} onChange={handleRatingChange} checked={rating === '4'}></input>
                    <label className="rate__label" htmlFor="star-4" title="Хорошо"></label>
                    <input className="visually-hidden" type="radio" id="star-3" name="rate" value="3" tabIndex={2} onChange={handleRatingChange} checked={rating === '3'}></input>
                    <label className="rate__label" htmlFor="star-3" title="Нормально"></label>
                    <input className="visually-hidden" type="radio" id="star-2" name="rate" value="2" tabIndex={2} onChange={handleRatingChange} checked={rating === '2'}></input>
                    <label className="rate__label" htmlFor="star-2" title="Плохо"></label>
                    <input className="visually-hidden" type="radio" id="star-1" name="rate" value="1" tabIndex={2} onChange={handleRatingChange} checked={rating === '1'}></input>
                    <label className="rate__label" htmlFor="star-1" title="Ужасно"></label><span className="rate__count"></span>{!isValid && <span className="rate__message">Поставьте оценку</span>}
                  </div>
                </div>
              </div>
              <label className="form-review__label" htmlFor="user-name">Достоинства</label>
              <input className="form-review__input" id="pros" type="text" autoComplete="off" tabIndex={3} value={advantage} onChange={handleAdvantageInput}></input>
              <label className="form-review__label" htmlFor="user-name">Недостатки</label>
              <input className="form-review__input" id="user-name" type="text" autoComplete="off" tabIndex={4} value={disadvantage} onChange={handleDisadvantageInput}></input>
              <label className="form-review__label" htmlFor="user-name">Комментарий</label>
              <textarea className="form-review__input form-review__input--textarea" id="user-name" rows={10} autoComplete="off" tabIndex={5} value={comment} onChange={handleCommentInput}></textarea>
              <button className="button button--medium-20 form-review__button" type="submit" tabIndex={6}>Отправить отзыв</button>
            </form>
            <button className="modal__close-btn button-cross" type="button" aria-label="Закрыть" onClick={props.handleModalClose} tabIndex={7}><span className="button-cross__icon"></span><span className="modal__close-btn-interactive-area"></span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ModalReview;
