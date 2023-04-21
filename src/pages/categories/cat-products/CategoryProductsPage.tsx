import React, { useEffect, useState } from 'react';
import './categoryProductPage.css';
import { FavIcon, ProductModal, StarsDisplay } from '../../../components';
import { formatPriceNum } from '../../../utils';
import { BiCartAdd } from 'react-icons/bi';
import { useLoader, usePageTitle } from '../../../hooks';
import useStore from '../../../hooks/useStore';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { observer } from 'mobx-react';
import { Modal } from '../../../portals';
import { IoMdArrowBack } from 'react-icons/io';

export default observer(function CategoryProductsPage(): React.ReactElement {
  usePageTitle('Product ');
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const { state } = useLocation();
  const navigate = useNavigate();
  const { subCategoryId } = useParams();
  const {
    productStore: {
      getAllProducts,
      products,
      setProducts,
      activeProdId,
      setActiveProdId
    }
  } = useStore();

  const { setIsLoading } = useLoader();

  useEffect(() => {
    const fetchData = async (): Promise<void> => {
      try {
        setIsLoading(true);
        await getAllProducts(subCategoryId!);
        setIsLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
    return () => {
      setProducts([]);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <>
      <div className='full'>
        <div className='vector--top-right-bg'></div>
        <div className='vector--btm-left-bg'></div>
        <div className='categories--container'>
          <h1 className='categories--title s-cat--title pad-b-2rem uppercase flex justify-center align-center gap-20'>
            <IoMdArrowBack
              onClick={() => {
                navigate(-1);
              }}
              className='cursor-pointer'
            />
            {state}
          </h1>
          <div className='flex flex-column categories-wrap'>
            <div className='card--group product--group products--grid'>
              {products.map((prod: any) => {
                return (
                  <>
                    <ProductCard
                      key={prod.id}
                      imgUrl={prod.data.images[0]}
                      name={prod.data.productName}
                      currency={prod.data.currency}
                      price={prod.data.price}
                      prodId={prod.id}
                      subCatId={prod.data.subCategoryId}
                      onProductSelect={() => {
                        setActiveProdId(prod.id);
                      }}
                      isFavorite={prod.data.isFavorite}
                      onModalToggle={() => {
                        setIsModalOpen(true);
                      }}
                    />
                  </>
                );
              })}
              <Modal
                isOpen={isModalOpen}
                onClose={() => {
                  setIsModalOpen(false);
                }}
              >
                <div className='modal'>
                  <ProductModal
                    subCatId={subCategoryId}
                    prodId={activeProdId}
                    onClose={() => {
                      setIsModalOpen(false);
                    }}
                  />
                </div>
              </Modal>
            </div>
          </div>
        </div>
      </div>
    </>
  );
});

interface IProductCardProps {
  imgUrl: string;
  name: string;
  numOfStars?: number;
  currency: string;
  price: number;
  onModalToggle: () => void;
  onProductSelect: () => void;
  prodId: string;
  subCatId: string;
  isFavorite: boolean;
}

export const ProductCard = observer(function ProductCard(
  props: IProductCardProps
): React.ReactElement {
  const {
    productStore: { setActiveProdId, toggleFavoriteState },
    cartStore: { checkItemAvailability }
  } = useStore();

  const {
    imgUrl,
    name,
    numOfStars,
    price,
    currency,
    onModalToggle,
    onProductSelect,
    prodId,
    subCatId,
    isFavorite
  } = props;
  return (
    <div className='card--item-wrap'>
      <div className='product--favorite cart__ef'>
        <FavIcon
          isFavorite={isFavorite}
          prodId={prodId}
          subCatId={subCatId}
        />
      </div>
      <div
        className='card--item product--item'
        onClick={() => {
          setActiveProdId(prodId);
          onProductSelect();
          onModalToggle();
        }}
      >
        <div className='flex product'>
          <div className='product-hov-ef flex'>
            <div className='product--img'>
              <img
                className='product--img-side'
                src={imgUrl}
                alt={`img-url${imgUrl}`}
              />
            </div>
            <div className='flex flex-column product--content'>
              <h2 className='product--title'>{name}</h2>
              <StarsDisplay
                product
                starsNum={numOfStars ?? 4}
              />
              <div className='flex justify-spaceBetween align-center'>
                <p className='product--price'>
                  {formatPriceNum(price)} <span>{currency}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        className='product--cart cart__ef'
        onClick={() => {
          checkItemAvailability(subCatId, prodId);
        }}
      >
        <BiCartAdd />
      </div>
    </div>
  );
});
