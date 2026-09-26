import CollectionPage from './CollectionPage.jsx'

function Activities() {
  return (
    <CollectionPage
      resource="activities"
      title="Activities"
      description="A record of movement, training sessions, and personal milestones."
      columns={[
        { key: 'type', label: 'Activity' },
        { key: 'durationMinutes', label: 'Minutes' },
        { key: 'distanceKm', label: 'Distance km' },
        { key: 'points', label: 'Points' },
        { key: 'completedAt', label: 'Completed' },
      ]}
    />
  )
}

export default Activities