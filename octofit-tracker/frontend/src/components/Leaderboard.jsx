import CollectionPage from './CollectionPage.jsx'

function Leaderboard() {
  return (
    <CollectionPage
      resource="leaderboard"
      title="Leaderboard"
      description="See how consistent effort adds up across the school community."
      columns={[
        { key: 'rank', label: 'Rank' },
        { key: 'points', label: 'Points' },
      ]}
    />
  )
}

export default Leaderboard