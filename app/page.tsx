import Header from '../components/Header';
import FeaturedProductList from '../components/FeaturedProductList';
import ProductByCategory from '@/components/ProductByCategory';

async function Home() {
  return (
    <div>
      <Header />
      <FeaturedProductList />
      <ProductByCategory />
    </div>
  );
}

export default Home;