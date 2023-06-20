import Header from '../components/Header/Header'
import StatsItems from '../components/Stats/StatsItems'
const StatsPage = () => {
	return (
		<>
			<Header className={'stats-page'} showButton={false} description='Stats'>
                <StatsItems></StatsItems>


            </Header>
		</>
	)
}

export default StatsPage
