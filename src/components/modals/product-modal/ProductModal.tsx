import { StarsDisplay } from '../../stars';
import './productModal.css';
import { AiOutlineCloseCircle, AiOutlineHeart } from 'react-icons/ai';
import { BiCartAdd } from 'react-icons/bi';
import { observer } from 'mobx-react';
import useStore from '../../../hooks/useStore';
import { useEffect } from 'react';
import { useLoader } from '../../../hooks';

interface IProductModalProps {
  onClose?: () => void;
  prodId?: string;
  subCatId?: string;
}

export default observer(function ProductModal(
  props: IProductModalProps
): React.ReactElement {
  const { onClose, prodId, subCatId } = props;

  const { setIsLoading } = useLoader();

  const {
    productStore: { product, getProductById, setProduct, setActiveProdId }
  } = useStore();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        await getProductById(prodId!, subCatId!);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();

    return () => {
      setProduct([]);
      setActiveProdId('');
    };
  }, []);

  return (
    <div className='products-details__modal'>
      <div className='product--m-container'>
        {product.map((prod) => {
          return (
            <>
              <AiOutlineCloseCircle
                className='exit--modal'
                onClick={onClose}
              />
              <div className='product--m-wrap'>
                <div className='product--m-img-group'>
                  <img
                    className='product--m-main-img'
                    src={prod.images[0]}
                    alt='main-img'
                  />
                  <img
                    className='product--m-left-side-img'
                    src={prod.images[1]}
                    alt='left side img'
                  />
                  <img
                    className='product--m-right-side-img'
                    src={prod.images[2]}
                    alt='right side img'
                  />
                </div>
                <div className='product--m-content-group'>
                  <div className='flex justify-spaceBetween'>
                    <h1 className='product--m-content-title'>
                      {prod.productName}
                    </h1>
                    <AiOutlineHeart className='product--m-content-favorite' />
                  </div>
                  <StarsDisplay
                    className='product--m-stars'
                    starsNum={prod?.rating}
                    product
                  />
                  <div className='product--m-category flex'>
                    <em className='product--m-label'>Category: </em>
                    <p className='product--m-value'>{prod.category}</p>
                  </div>
                  <div className='product--m-category flex'>
                    <em className='product--m-label'>Brand: </em>
                    <p className='product--m-value'>{prod.brand}</p>
                  </div>
                  <div className='product--m-description flex flex-column'>
                    <em className='product--m-label'>Description</em>
                    <p className='product--m-desc-content'>
                      {prod.description}
                    </p>
                  </div>
                  <div className='product--m-modal-order flex justify-spaceBetween'>
                    <div className='product--m-modal-price'>
                      {prod.price} <span>{prod.currency}</span>
                    </div>
                    <BiCartAdd className='product--m-cart-icon' />
                  </div>
                </div>
              </div>
            </>
          );
        })}
      </div>
    </div>
  );
});
