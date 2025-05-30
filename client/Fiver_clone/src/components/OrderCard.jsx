import React from 'react';
import orderPlaceholder from '../assets/10142434.jpg';

export const OrderCard = ({ order, gigDetails, freelancerDetails }) => {
  // Debug logging
  console.log("=== OrderCard Debug Info ===");
  console.log("order:", order);
  console.log("gigDetails:", gigDetails);
  console.log("freelancerDetails:", freelancerDetails);
  console.log("===========================");

  const formatDate = (dateString) => {
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        day: 'numeric',
        month: 'long',
        year: 'numeric'
      });
    } catch (error) {
      console.error("Date formatting error:", error);
      return "Invalid Date";
    }
  };

  const formatPrice = (price) => {
    try {
      return `$${parseFloat(price).toFixed(2)}`;
    } catch (error) {
      console.error("Price formatting error:", error);
      return "$0.00";
    }
  };

  const getStatusDisplay = (status) => {
    const statusMap = {
      'PENDING': { text: 'Pending', color: 'text-orange-500 bg-orange-50' },
      'IN_PROGRESS': { text: 'In Progress', color: 'text-blue-500 bg-blue-50' },
      'COMPLETED': { text: 'Completed', color: 'text-green-500 bg-green-50' },
      'DELIVERED': { text: 'Delivered', color: 'text-green-500 bg-green-50' },
      'CANCELLED': { text: 'Cancelled', color: 'text-red-500 bg-red-50' }
    };
    return statusMap[status] || { text: status, color: 'text-gray-500 bg-gray-50' };
  };

  const statusDisplay = getStatusDisplay(order?.status);

  if (!order) {
    console.log("No order data provided");
    return null;
  }

  return (
    <div className="flex flex-col sm:flex-row gap-4 sm:gap-6">
      
      <div className="flex-shrink-0 mx-auto sm:mx-0">
        <div className="w-20 h-20 sm:w-24 sm:h-24 lg:w-32 lg:h-32">
          <img
            src={gigDetails?.thumbnailUrl || orderPlaceholder}
            alt={gigDetails?.title || "Order Item"}
            className="w-full h-full object-cover rounded-lg"
            onError={(e) => {
              console.log("Image load error, using placeholder");
              e.target.src = orderPlaceholder;
            }}
          />
        </div>
      </div>

     
      <div className="flex-grow min-w-0">
        <div className="space-y-4">
          
          <div>
            <h3 className="text-base sm:text-lg font-medium text-gray-900 mb-2 line-clamp-2">
              {gigDetails?.title || "Gig details unavailable"}
            </h3>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 text-sm text-gray-600">
              <span>
                By: <span className="font-medium text-gray-900">
                  {freelancerDetails?.username || freelancerDetails?.email || "Freelancer"}
                </span>
              </span>
              {freelancerDetails?.email && (
                <>
                  <span className="hidden sm:inline">•</span>
                  <a
                    href={`mailto:${freelancerDetails.email}`}
                    className="text-green-600 hover:text-green-700 font-medium"
                  >
                    {freelancerDetails.email}
                  </a>
                </>
              )}
            </div>
          </div>

          {/* Order Details Grid - Mobile Responsive */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 text-sm">
            {/* Price */}
            <div className="col-span-1">
              <span className="block text-gray-500 mb-1">Price</span>
              <span className="font-semibold text-gray-900">
                {formatPrice(order.price)}
              </span>
            </div>

            {/* Quantity */}
            <div className="col-span-1">
              <span className="block text-gray-500 mb-1">Quantity</span>
              <span className="text-gray-900">1</span>
            </div>

            {/* Status */}
            <div className="col-span-1">
              <span className="block text-gray-500 mb-1">Status</span>
              <span className={`inline-flex px-2 py-1 rounded-full text-xs font-medium ${statusDisplay.color}`}>
                {statusDisplay.text}
              </span>
            </div>

            {/* Delivery Date */}
            <div className="col-span-1">
              <span className="block text-gray-500 mb-1">Expected Delivery</span>
              <span className="text-gray-900 text-xs sm:text-sm">
                {gigDetails?.deliveryTime ? 
                  formatDate(new Date(Date.now() + (gigDetails.deliveryTime * 24 * 60 * 60 * 1000)).toISOString()) : 
                  formatDate(order.createdAt)
                }
              </span>
            </div>
          </div>

          {/* Action Buttons - Mobile Responsive */}
          <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 pt-2">
            {order.status === 'DELIVERED' && (
              <button className="px-4 py-2 text-sm font-medium text-green-600 bg-green-50 hover:bg-green-100 rounded-md transition-colors">
                Leave Review
              </button>
            )}
            {(order.status === 'PENDING' || order.status === 'IN_PROGRESS') && (
              <button className="px-4 py-2 text-sm font-medium text-blue-600 bg-blue-50 hover:bg-blue-100 rounded-md transition-colors">
                View Progress
              </button>
            )}
            <button className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-50 hover:bg-gray-100 rounded-md transition-colors">
              Order Details
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};