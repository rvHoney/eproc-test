import Header from '../components/Header';
import FeaturedProductList from '../components/FeaturedProductList';
import ProductByCategory from '@/components/ProductByCategory';
import Navbar from '@/components/Navbar';

async function Home() {
  return (
    <div className="px-4 md:px-16 px-50">
      <Navbar />
      <Header />
      <FeaturedProductList />
      <ProductByCategory />
    </div>
  );
}

export default Home;