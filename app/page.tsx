import Header from '../components/Header';
import FeaturedProductList from '../components/FeaturedProductList';

async function Home() {
  return (
    <div>
      <Header />
      <FeaturedProductList />
    </div>
  );
}

export default Home;