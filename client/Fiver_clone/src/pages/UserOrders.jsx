import React, { useEffect, useState } from "react";
import { OrderCard } from "../components/OrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getOrdersByBuyer } from "../redux/OrderSlice/orderSlice";
import { getAllGigs } from "../redux/GigSlice/gigSlice";
import { getFreelancerDetails } from "../redux/AuthSlice/authSlice";

export const UserOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Order");
  const [freelancerDetailsMap, setFreelancerDetailsMap] = useState({});

  const { userOrders, userOrdersError, userOrdersLoading } = useSelector(
    (state) => state.order
  );
  const { allGigs, allGigLoading, allGigError } = useSelector(
    (state) => state.gig
  );
  const { userDetails, freelancer } = useSelector((state) => state.auth);

  // Debug logging
  useEffect(() => {
    console.log("=== UserOrders Debug Info ===");
    console.log("userDetails:", userDetails);
    console.log("userOrders:", userOrders);
    console.log("userOrdersLoading:", userOrdersLoading);
    console.log("userOrdersError:", userOrdersError);
    console.log("allGigs:", allGigs);
    console.log("allGigLoading:", allGigLoading);
    console.log("allGigError:", allGigError);
    console.log("freelancer:", freelancer);
    console.log("freelancerDetailsMap:", freelancerDetailsMap);
    console.log("============================");
  }, [
    userDetails,
    userOrders,
    userOrdersLoading,
    userOrdersError,
    allGigs,
    allGigLoading,
    allGigError,
    freelancer,
    freelancerDetailsMap,
  ]);

  // Fetch all gigs
  useEffect(() => {
    console.log("Dispatching getAllGigs...");
    dispatch(getAllGigs());
  }, [dispatch]);

  // Fetch user orders
  useEffect(() => {
    if (userDetails?.id) {
      console.log("Dispatching getOrdersByBuyer with ID:", userDetails.id);
      dispatch(getOrdersByBuyer(userDetails.id));
    } else {
      console.log("No userDetails or userDetails.id found");
    }
  }, [dispatch, userDetails]);

  // Fetch freelancer details for all unique seller IDs
  useEffect(() => {
    if (userOrders && Array.isArray(userOrders)) {
      const uniqueSellerIds = [...new Set(userOrders.map(order => order.sellerId))];
      
      uniqueSellerIds.forEach(sellerId => {
        if (sellerId && !freelancerDetailsMap[sellerId]) {
          console.log(`Dispatching getFreelancerDetails for ID: ${sellerId}`);
          dispatch(getFreelancerDetails(sellerId));
        }
      });
    }
  }, [dispatch, userOrders, freelancerDetailsMap]);

  // Update freelancer details map when new freelancer data comes in
  useEffect(() => {
    if (freelancer && freelancer.id) {
      setFreelancerDetailsMap(prev => ({
        ...prev,
        [freelancer.id]: freelancer
      }));
    }
  }, [freelancer]);

  const getGigById = (gigId) => {
    console.log(`Looking for gig with ID: ${gigId}`);
    const foundGig = allGigs?.find((gig) => gig.id === gigId) || null;
    console.log(`Found gig:`, foundGig);
    return foundGig;
  };

  const getFreelancerById = (sellerId) => {
    console.log(`Looking for freelancer with ID: ${sellerId}`);
    const foundFreelancer = freelancerDetailsMap[sellerId] || null;
    console.log(`Found freelancer:`, foundFreelancer);
    return foundFreelancer;
  };

  const getFilteredOrders = () => {
    if (!userOrders || !Array.isArray(userOrders)) return [];

    switch (activeTab) {
      case "All Order":
        return userOrders;
      case "Pending":
        return userOrders.filter(
          (order) =>
            order.status === "PENDING" || order.status === "IN_PROGRESS"
        );
      case "Completed":
        return userOrders.filter(
          (order) =>
            order.status === "COMPLETED" || order.status === "DELIVERED"
        );
      case "Cancelled":
        return userOrders.filter((order) => order.status === "CANCELLED");
      default:
        return userOrders;
    }
  };

  const filteredOrders = getFilteredOrders();

  const tabs = [
    { name: "All Order", count: userOrders?.length || 0 },
    {
      name: "Pending",
      count:
        userOrders?.filter(
          (o) => o.status === "PENDING" || o.status === "IN_PROGRESS"
        ).length || 0,
    },
    {
      name: "Completed",
      count:
        userOrders?.filter(
          (o) => o.status === "COMPLETED" || o.status === "DELIVERED"
        ).length || 0,
    },
    {
      name: "Cancelled",
      count: userOrders?.filter((o) => o.status === "CANCELLED").length || 0,
    },
  ];

  // Loading state
  if (userOrdersLoading || allGigLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Order History
        </h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  // Error state
  if (userOrdersError || allGigError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Order History
        </h1>
        <div className="text-center py-12">
          <p className="text-red-600 mb-4">Error loading orders</p>
          <button
            onClick={() => window.location.reload()}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Empty state
  if (!userOrders || userOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          Order History
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't placed any orders yet.
          </p>
          <button
            onClick={() => navigate("/")}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Browse Gigs →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        Order History
      </h1>

      {/* Tab Navigation - Mobile Responsive */}
      <div className="mb-6">
        <div className="flex overflow-x-auto scrollbar-hide space-x-1 bg-gray-100 p-1 rounded-lg">
          {tabs.map((tab) => (
            <button
              key={tab.name}
              onClick={() => setActiveTab(tab.name)}
              className={`flex-shrink-0 px-3 sm:px-4 py-2 rounded-md text-xs sm:text-sm font-medium transition-colors whitespace-nowrap ${
                activeTab === tab.name
                  ? "bg-green-600 text-white"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {tab.name}
              <span className="ml-1 sm:ml-2 text-xs">({tab.count})</span>
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="space-y-4 sm:space-y-6">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-8">
            <p className="text-gray-500">
              No orders found for the selected filter.
            </p>
          </div>
        ) : (
          filteredOrders.map((order) => {
            const gigDetails = getGigById(order.gigId);
            const freelancerDetails = getFreelancerById(order?.sellerId);
            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
              >
                {/* Order Header - Mobile Responsive */}
                <div className="border-b border-gray-200 px-4 sm:px-6 py-3 sm:py-4">
                  <div className="flex flex-col space-y-2 sm:space-y-0 sm:flex-row sm:justify-between sm:items-center">
                    <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-xs sm:text-sm text-gray-600">
                      <span className="font-medium">Order: #{order.id}</span>
                      <span>
                        Order Date:{" "}
                        {new Date(order.createdAt).toLocaleDateString("en-US", {
                          day: "numeric",
                          month: "short",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {/* Contact Freelancer Button - Mobile Responsive */}
                    {getFreelancerById(order?.sellerId)?.email && (
                      <a
                        href={`mailto:${getFreelancerById(order?.sellerId).email}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                      >
                        Contact Freelancer
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <OrderCard 
                    order={order} 
                    gigDetails={gigDetails} 
                    freelancerDetails={freelancerDetails} 
                  />
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
};