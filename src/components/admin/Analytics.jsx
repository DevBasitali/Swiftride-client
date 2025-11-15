import { useEffect, useState } from "react";
import axios from "axios";
import { Line, Pie, Bar } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import Toast from "../Toast";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const Base_Url = import.meta.env.VITE_API_URL;

const Analytics = ({ customerData, showroomData, onRefresh }) => {
  const [reviewsData, setReviewsData] = useState({});
  const [isLoadingReviews, setIsLoadingReviews] = useState(false);
  const [stats, setStats] = useState({
    bannedShowrooms: 0,
    averageRating: 0,
  });

  // Generate dummy reviews (consistent with Showroom component)
  const generateDummyReviews = (showroomId) => {
    const dummyUserNames = [
      "John Doe",
      "Jane Smith",
      "Alex Brown",
      "Emily Davis",
    ];
    const dummyComments = [
      "Average experience, could be better.",
      "Great showroom, highly recommend!",
      "Not satisfied with the service.",
      "Good selection but slow response.",
    ];
    const currentDate = new Date();

    return Array.from({ length: 3 }, (_, index) => ({
      _id: `${showroomId}-dummy-${index}`,
      userName:
        dummyUserNames[Math.floor(Math.random() * dummyUserNames.length)],
      rating: Math.floor(Math.random() * 5) + 1,
      comment: dummyComments[Math.floor(Math.random() * dummyComments.length)],
      createdAt: new Date(
        currentDate.getTime() - Math.random() * 30 * 24 * 60 * 60 * 1000
      ).toISOString(),
    }));
  };

  // Fetch reviews for all showrooms
  const fetchReviews = async () => {
    setIsLoadingReviews(true);
    try {
      const reviews = {};
      for (const showroom of showroomData) {
        try {
          const reviewResponse = await axios.get(
            `${Base_Url}/api/reviews/showroom/${showroom._id}`
          );
          const fetchedReviews = reviewResponse.data.reviews || [];
          reviews[showroom._id] =
            fetchedReviews.length > 0
              ? fetchedReviews
              : generateDummyReviews(showroom._id);
        } catch (reviewError) {
          // Toast(
          //   "Failed to fetch reviews for showroom, using dummy reviews",
          //   "warn"
          // );
          console.log(
            `Failed to fetch reviews for showroom ${showroom._id}:`,
            reviewError
          );

          reviews[showroom._id] = generateDummyReviews(showroom._id);
        }
      }
      setReviewsData(reviews);

      // Calculate statistics
      const bannedShowrooms = showroomData.filter(
        (showroom) => showroom.status.toLowerCase() === "banned"
      ).length;

      let totalRatings = 0;
      let totalReviews = 0;
      Object.values(reviews).forEach((reviewList) => {
        reviewList.forEach((review) => {
          totalRatings += review.rating;
          totalReviews++;
        });
      });
      const averageRating =
        totalReviews > 0 ? (totalRatings / totalReviews).toFixed(1) : 0;

      setStats({
        bannedShowrooms,
        averageRating,
      });
    } catch (error) {
      Toast("Error fetching review data", "error");
    } finally {
      setIsLoadingReviews(false);
    }
  };

  useEffect(() => {
    if (showroomData.length > 0) {
      fetchReviews();
    }
  }, [showroomData]);

  // Prepare data for charts
  const getMonthlyData = (data, dateField) => {
    const months = Array(12).fill(0);
    const currentYear = new Date().getFullYear();
    data.forEach((item) => {
      const date = new Date(item[dateField]);
      if (date.getFullYear() === currentYear) {
        months[date.getMonth()]++;
      }
    });
    return months;
  };

  const customerGrowthData = {
    labels: [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ],
    datasets: [
      {
        label: "Customer Registrations",
        data: getMonthlyData(customerData, "createdAt"),
        borderColor: "#3B82F6",
        backgroundColor: "rgba(59, 130, 246, 0.2)",
        fill: true,
      },
    ],
  };

  const showroomGrowthData = {
    labels: customerGrowthData.labels,
    datasets: [
      {
        label: "Showroom Additions",
        data: getMonthlyData(showroomData, "createdAt"),
        borderColor: "#10B981",
        backgroundColor: "rgba(16, 185, 129, 0.2)",
        fill: true,
      },
    ],
  };

  const showroomStatusData = {
    labels: ["Active", "Banned", "Pending Approval"],
    datasets: [
      {
        data: [
          showroomData.filter((s) => s.status.toLowerCase() === "active")
            .length,
          showroomData.filter((s) => s.status.toLowerCase() === "banned")
            .length,
          showroomData.filter((s) => s.isApproved === 0).length,
        ],
        backgroundColor: ["#10B981", "#EF4444", "#F59E0B"],
      },
    ],
  };

  const reviewRatingData = {
    labels: ["1 Star", "2 Stars", "3 Stars", "4 Stars", "5 Stars"],
    datasets: [
      {
        label: "Review Ratings",
        data: [0, 0, 0, 0, 0].map((_, index) => {
          const rating = index + 1;
          return Object.values(reviewsData)
            .flat()
            .filter((review) => review.rating === rating).length;
        }),
        backgroundColor: [
          "#EF4444",
          "#F59E0B",
          "#3B82F6",
          "#10B981",
          "#22C55E",
        ],
      },
    ],
  };

  const chartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        position: "top",
      },
    },
  };

  // Calculate top showrooms by average rating
  const topShowrooms = showroomData
    .map((showroom) => {
      const reviews = reviewsData[showroom._id] || [];
      const averageRating =
        reviews.length > 0
          ? (
              reviews.reduce((sum, review) => sum + review.rating, 0) /
              reviews.length
            ).toFixed(1)
          : "N/A";
      return {
        ...showroom,
        averageRating,
        reviewCount: reviews.length,
      };
    })
    .sort((a, b) =>
      b.averageRating === "N/A"
        ? -1
        : parseFloat(b.averageRating) - parseFloat(a.averageRating)
    )
    .slice(0, 5);

  return (
    <div className="space-y-8">
      {isLoadingReviews ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
        </div>
      ) : (
        <>
          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Platform Growth
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="h-64">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Customer Registrations (2025)
                </h4>
                <Line data={customerGrowthData} options={chartOptions} />
              </div>
              <div className="h-64">
                <h4 className="text-sm font-medium text-gray-600 mb-2">
                  Showroom Additions (2025)
                </h4>
                <Line data={showroomGrowthData} options={chartOptions} />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow p-6">
            <h3 className="text-lg font-semibold text-gray-800 mb-4">
              Showroom Status Distribution
            </h3>
            <div className="h-64 max-w-md mx-auto">
              <Pie data={showroomStatusData} options={chartOptions} />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Analytics;
