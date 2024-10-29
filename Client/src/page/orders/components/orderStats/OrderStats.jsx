import styles from "./OrderStats.module.css";
import StatCard from "./StatCard";
const OrderStats = ({ orderStats }) => {
  // Convert orderStats object to array with proper format
  const formatOrderStats = (stats) => {
    if (!stats || typeof stats !== 'object') {
      return [];
    }

    // Define mapping of status to icon classes and labels
    const statusMapping = {
      completed: {
        iconClass: 'iconCompleted',
        label: 'Orders Completed'
      },
      confirmed: {
        iconClass: 'iconConfirmed',
        label: 'Orders Confirmed'
      },
      cancelled: {
        iconClass: 'iconCanceled',
        label: 'Orders Canceled'
      },
      refund: {
        iconClass: 'iconRefund',
        label: 'Orders on Refund'
      }
    };

    // Transform the object into array
    const statsArray = Object.entries(stats).map(([status, value]) => {
      const statusKey = status.toLowerCase();
      return {
        iconClass: statusMapping[statusKey]?.iconClass || 'iconDefault',
        label: statusMapping[statusKey]?.label || status,
        value: value.toString()
      };
    });

    return statsArray;
  };

  const formattedStats = formatOrderStats(orderStats);
  console.log("Formatted Stats Array:", formattedStats);

  return (
    <section className={styles.orderStatsContainer}>
      <div className={styles.orderStatsGrid}>
        {formattedStats.length > 0 ? (
          formattedStats.map((stat, index) => (
            <StatCard key={index} {...stat} />
          ))
        ) : (
          <p>No order stats available.</p>
        )}
      </div>
    </section>
  );
};

export default OrderStats;