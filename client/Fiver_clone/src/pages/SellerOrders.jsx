import React, { useEffect, useState } from "react";
import { SellerOrderCard } from "../components/SellerOrderCard";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllGigs } from "../redux/GigSlice/gigSlice";
import { getOrdersBySeller, updateOrderStatus } from "../redux/OrderSlice/orderSlice";
import { getUserByIdDetails } from "../redux/AuthSlice/authSlice";
import toast from "react-hot-toast";

export const SellerOrders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("All Order");
  const [buyerDetailsMap, setBuyerDetailsMap] = useState({});

  const { sellerOrders, sellerOrdersError, sellerOrdersLoading  } = useSelector(
    (state) => state.order
  );
  const { allGigs, allGigLoading, allGigError } = useSelector(
    (state) => state.gig
  );
  const { userDetails, buyerDetails: buyer } = useSelector((state) => state.auth);

  useEffect(() => {
    console.log("=== SellerOrders Debug Info ===");
    console.log("userDetails:", userDetails);
    console.log("sellerOrders:", sellerOrders);
    console.log("sellerOrdersLoading:", sellerOrdersLoading);
    console.log("sellerOrdersError:", sellerOrdersError);
    console.log("allGigs:", allGigs);
    console.log("allGigLoading:", allGigLoading);
    console.log("allGigError:", allGigError);
    console.log("buyer:", buyer);
    console.log("buyerDetailsMap:", buyerDetailsMap);
    console.log("============================");
  }, [
    userDetails,
    sellerOrders,
    sellerOrdersLoading,
    sellerOrdersError,
    allGigs,
    allGigLoading,
    allGigError,
    buyer,
    buyerDetailsMap,
  ]);

  useEffect(() => {
    console.log("Dispatching getAllGigs...");
    dispatch(getAllGigs());
  }, [dispatch]);

  useEffect(() => {
    if (userDetails?.id) {
      console.log("Dispatching getOrdersBySeller with ID:", userDetails.id);
      dispatch(getOrdersBySeller(userDetails.id));
    } else {
      console.log("No userDetails or userDetails.id found");
    }
  }, [dispatch, userDetails]);

  useEffect(() => {
    if (sellerOrders && Array.isArray(sellerOrders)) {
      const uniqueBuyerIds = [
        ...new Set(sellerOrders.map((order) => order.buyerId)),
      ];

      uniqueBuyerIds.forEach((buyerId) => {
        if (buyerId && !buyerDetailsMap[buyerId]) {
          console.log(`Dispatching getBuyerDetails for ID: ${buyerId}`);
          dispatch(getUserByIdDetails(buyerId))
          
        }
      });
    }
  }, [dispatch, sellerOrders, buyerDetailsMap]);

  useEffect(() => {
    if (buyer && buyer.id) {
      setBuyerDetailsMap((prev) => ({
        ...prev,
        [buyer.id]: buyer,
      }));
    }
  }, [buyer]);

  const getGigById = (gigId) => {
    console.log(`Looking for gig with ID: ${gigId}`);
    const foundGig = allGigs?.find((gig) => gig.id === gigId) || null;
    console.log(`Found gig:`, foundGig);
    return foundGig;
  };

  const getBuyerById = (buyerId) => {
    console.log(`Looking for buyer with ID: ${buyerId}`);
    const foundBuyer = buyerDetailsMap[buyerId] || null;
    console.log(`Found buyer:`, foundBuyer);
    return foundBuyer;
  };

  const handleStatusUpdate = (orderId, newStatus) => {
  console.log(`Updating order ${orderId} status to ${newStatus}`);
  dispatch(updateOrderStatus({ orderId, status: newStatus }));

  const toastId = toast.success(`Order status updated to ${newStatus}`, {
    duration: 3000,
    position: "top-center",
    style: {
      fontSize: "14px",
      padding: "8px 16px",
      background: "#f0fff4",
      color: "#065f46",
      border: "1px solid #bbf7d0",
    },
  });

  setTimeout(() => {
    toast.dismiss(toastId); 
    window.location.reload(); 
  }, 3000); 
};


  const getFilteredOrders = () => {
    if (!sellerOrders || !Array.isArray(sellerOrders)) return [];

    switch (activeTab) {
      case "All Order":
        return sellerOrders;
      case "Pending":
        return sellerOrders.filter(
          (order) =>
            order.status === "PENDING" || order.status === "IN_PROGRESS"
        );
      case "Completed":
        return sellerOrders.filter(
          (order) =>
            order.status === "COMPLETED" || order.status === "DELIVERED"
        );
      case "Cancelled":
        return sellerOrders.filter((order) => order.status === "CANCELLED");
      default:
        return sellerOrders;
    }
  };

  const filteredOrders = getFilteredOrders();

  const tabs = [
    { name: "All Order", count: sellerOrders?.length || 0 },
    {
      name: "Pending",
      count:
        sellerOrders?.filter(
          (o) => o.status === "PENDING" || o.status === "IN_PROGRESS"
        ).length || 0,
    },
    {
      name: "Completed",
      count:
        sellerOrders?.filter(
          (o) => o.status === "COMPLETED" || o.status === "DELIVERED"
        ).length || 0,
    },
    {
      name: "Cancelled",
      count: sellerOrders?.filter((o) => o.status === "CANCELLED").length || 0,
    },
  ];

  if (sellerOrdersLoading || allGigLoading) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          My Orders
        </h1>
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-green-600"></div>
        </div>
      </div>
    );
  }

  if (sellerOrdersError || allGigError) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          My Orders
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

  if (!sellerOrders || sellerOrders.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
          My Orders
        </h1>
        <div className="text-center py-12">
          <p className="text-gray-500 mb-4">
            You haven't received any orders yet.
          </p>
          <button
            onClick={() => navigate("/dashboard")}
            className="text-green-600 hover:text-green-700 font-medium"
          >
            Go to Dashboard →
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
      <h1 className="text-xl sm:text-2xl font-semibold text-gray-900 mb-6">
        My Orders
      </h1>

      
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
            const buyerDetails = getBuyerById(order?.buyerId);
            return (
              <div
                key={order.id}
                className="bg-white border border-gray-200 rounded-lg shadow-sm"
              >
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

                    {getBuyerById(order?.buyerId)?.email && (
                      <a
                        href={`mailto:${getBuyerById(order?.buyerId).email}`}
                        className="inline-flex items-center px-3 py-1.5 text-xs sm:text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors"
                      >
                        Contact Buyer
                      </a>
                    )}
                  </div>
                </div>

                <div className="p-4 sm:p-6">
                  <SellerOrderCard
                    order={order}
                    gigDetails={gigDetails}
                    buyerDetails={buyerDetails}
                    onStatusUpdate={handleStatusUpdate}
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
