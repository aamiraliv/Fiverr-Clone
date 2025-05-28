import React, {
  useState,
  useEffect,
  useCallback,
  useMemo,
  useRef,
} from "react";
import {
  ArrowLeft,
  CreditCard,
  Shield,
  Check,
  Star,
  Clock,
  User,
  MessageCircle,
  Heart,
  CheckCircle2,
  Trophy,
  Zap,
} from "lucide-react";
import { TbFileInvoice } from "react-icons/tb";
import { useDispatch, useSelector } from "react-redux";
import {
  confirmOrderPayment,
  getOrderById,
} from "../redux/OrderSlice/orderSlice";
import { useParams } from "react-router-dom";
import { getGigByGigId } from "../redux/GigSlice/gigSlice";
import { getFreelancerDetails } from "../redux/AuthSlice/authSlice";
import SiteLogo from "../assets/Aiverr_logo.png";

const generateInvoiceHTML = (gig, freelancer, order, userDetails) => {
  const currentDate = new Date().toLocaleDateString("en-GB");
  const orderId =
    order?.id?.toString().slice(-6) || "ORD-" + Date.now().toString().slice(-6);
  const gigPrice =
    typeof gig?.price === "number" ? gig.price : parseFloat(gig?.price) || 0;
  const serviceFee = Math.round(gigPrice * 0.05 * 100) / 100;
  const total = gigPrice + serviceFee;
  const tax = Math.round(total * 0.18 * 100) / 100;
  const grandTotal = total + tax;

  return `
    <!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Invoice</title>
</head>
<body style="font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif; margin: 0; padding: 20px; background-color: #f8f9fa; line-height: 1.5;">
    <div style="max-width: 800px; margin: 0 auto; background-color: #ffffff; border-radius: 8px; box-shadow: 0 2px 10px rgba(0,0,0,0.05); overflow: hidden;">
        
        <!-- Header Section -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 20px 25px; border-bottom: 2px solid #28a745;">
            <div style="display: flex; justify-content: space-between; align-items: center;">
                <!-- Logo Space -->
                <div style="display: flex; align-items: center;">
                    <div style="width: 45px; height: 45px; background: linear-gradient(135deg, #28a745, #20c997); border-radius: 8px; display: flex; align-items: center; justify-content: center; margin-right: 12px; box-shadow: 0 2px 6px rgba(40, 167, 69, 0.3);">
                        <img src="${SiteLogo}" alt="Aiverr Logo" style="width: 100%; height: 100%; border-radius: 8px; object-fit: cover;">
                    </div>
                    <div>
                        <h1 style="font-size: 24px; color: #212529; margin: 0; font-weight: 700;">Aiverr</h1>
                        <p style="font-size: 12px; color: #6c757d; margin: 0; font-weight: 500;">Professional Freelance Services</p>
                    </div>
                </div>
                
                <!-- Invoice Info -->
                <div style="text-align: right;">
                    <h2 style="font-size: 20px; color: #212529; margin: 0 0 5px; font-weight: 600;">INVOICE</h2>
                    <p style="font-size: 12px; color: #6c757d; margin: 0;">Number: <strong style="color: #212529;">#${orderId}</strong></p>
                    <p style="font-size: 12px; color: #6c757d; margin: 0;">Date: <strong style="color: #212529;">${currentDate}</strong></p>
                </div>
            </div>
        </div>

        <!-- Client and Service Provider Info -->
        <div style="padding: 25px; background-color: #ffffff;">
            <div style="display: flex; justify-content: space-between; gap: 40px; margin-bottom: 20px;">
                
                <!-- Bill To Section -->
                <div style="flex: 1;">
                    <h3 style="font-size: 14px; color: #212529; margin: 0 0 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #28a745; padding-bottom: 5px; display: inline-block;">Bill To</h3>
                    <div style="margin-bottom: 8px;">
                        <p style="font-size: 11px; color: #6c757d; margin: 0; font-weight: 500; text-transform: uppercase;">Client Name</p>
                        <p style="font-size: 14px; color: #212529; margin: 1px 0; font-weight: 600;">${
                          userDetails?.username || "Valued Client"
                        }</p>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <p style="font-size: 11px; color: #6c757d; margin: 0; font-weight: 500; text-transform: uppercase;">Email</p>
                        <p style="font-size: 12px; color: #495057; margin: 1px 0;">${
                          userDetails?.email || "[email protected]"
                        }</p>
                    </div>
                    <div style="margin-bottom: 8px;">
                        <p style="font-size: 11px; color: #6c757d; margin: 0; font-weight: 500; text-transform: uppercase;">Company</p>
                        <p style="font-size: 12px; color: #495057; margin: 1px 0;">${
                          order?.clientCompany || "Individual Client"
                        }</p>
                    </div>
                    <div>
                        <p style="font-size: 11px; color: #6c757d; margin: 0; font-weight: 500; text-transform: uppercase;">Order ID</p>
                        <p style="font-size: 12px; color: #495057; margin: 1px 0; font-weight: 600;">#${orderId}</p>
                    </div>
                </div>

                <!-- Service Provider Section -->
                <div style="flex: 1; text-align: right;">
                    <h3 style="font-size: 14px; color: #212529; margin: 0 0 12px; font-weight: 600; text-transform: uppercase; letter-spacing: 0.5px; border-bottom: 2px solid #28a745; padding-bottom: 5px; display: inline-block;">Service Provider</h3>
                    <div style="display: flex; flex-direction: column; align-items: flex-end;">
                        <div style="width: 35px; height: 35px; background: linear-gradient(135deg, #28a745, #20c997); color: #ffffff; font-size: 16px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin-bottom: 8px; font-weight: 600;">
                            <img src="${freelancer?.picture || "/api/placeholder/50/50"}" alt="${freelancer?.username || "Freelancer"}" style="width: 100%; height: 100%; border-radius: 50%; object-fit: cover;">
                        </div>
                        <div style="text-align: right;">
                            <p style="font-size: 14px; color: #212529; margin: 0 0 3px; font-weight: 600;">${
                              freelancer?.username || "Professional Freelancer"
                            }</p>
                            <p style="font-size: 12px; color: #495057; margin: 0 0 3px;">${
                              freelancer?.email || "[email protected]"
                            }</p>
                            <p style="font-size: 11px; color: #6c757d; margin: 0; font-weight: 500; text-transform: uppercase;">${
                              gig?.category || "Digital Services"
                            }</p>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Service Details Table -->
            <div style="margin-bottom: 20px;">
                <h3 style="font-size: 14px; color: #212529; margin: 0 0 12px; font-weight: 600;">Service Details</h3>
                <div style="border: 1px solid #e9ecef; border-radius: 8px; overflow: hidden;">
                    <table style="width: 100%; border-collapse: collapse;">
                        <thead>
                            <tr style="background: linear-gradient(135deg, #28a745, #20c997);">
                                <th style="padding: 10px 15px; text-align: left; font-size: 12px; color: #ffffff; font-weight: 600; text-transform: uppercase;">Description</th>
                                <th style="padding: 10px 15px; text-align: center; font-size: 12px; color: #ffffff; font-weight: 600; text-transform: uppercase;">Qty</th>
                                <th style="padding: 10px 15px; text-align: right; font-size: 12px; color: #ffffff; font-weight: 600; text-transform: uppercase;">Price</th>
                                <th style="padding: 10px 15px; text-align: right; font-size: 12px; color: #ffffff; font-weight: 600; text-transform: uppercase;">Total</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="border-bottom: 1px solid #e9ecef;">
                                <td style="padding: 12px 15px; font-size: 13px; color: #212529; vertical-align: top;">
                                    <div style="font-weight: 600; margin-bottom: 3px;">${
                                      gig?.title || "Professional Service"
                                    }</div>
                                    <div style="color: #6c757d; font-size: 11px; line-height: 1.3;">${
                                      gig?.category || "Digital Service"
                                    } - Premium quality service</div>
                                </td>
                                <td style="padding: 12px 15px; text-align: center; font-size: 13px; color: #212529; font-weight: 600;">1</td>
                                <td style="padding: 12px 15px; text-align: right; font-size: 13px; color: #212529; font-weight: 600;">₹${gigPrice.toFixed(
                                  2
                                )}</td>
                                <td style="padding: 12px 15px; text-align: right; font-size: 13px; color: #212529; font-weight: 600;">₹${gigPrice.toFixed(
                                  2
                                )}</td>
                            </tr>
                            <tr style="background-color: #f8f9fa;">
                                <td style="padding: 12px 15px; font-size: 13px; color: #212529; vertical-align: top;">
                                    <div style="font-weight: 600; margin-bottom: 3px;">Platform Service Fee</div>
                                    <div style="color: #6c757d; font-size: 11px; line-height: 1.3;">Processing & platform support (5%)</div>
                                </td>
                                <td style="padding: 12px 15px; text-align: center; font-size: 13px; color: #212529; font-weight: 600;">1</td>
                                <td style="padding: 12px 15px; text-align: right; font-size: 13px; color: #212529; font-weight: 600;">₹${serviceFee.toFixed(
                                  2
                                )}</td>
                                <td style="padding: 12px 15px; text-align: right; font-size: 13px; color: #212529; font-weight: 600;">₹${serviceFee.toFixed(
                                  2
                                )}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <!-- Totals Section -->
            <div style="display: flex; justify-content: flex-end; margin-bottom: 15px;">
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; min-width: 250px; border: 1px solid #e9ecef;">
                    <div style="display: flex; justify-content: space-between; margin-bottom: 6px;">
                        <span style="font-size: 13px; color: #495057; font-weight: 500;">Subtotal</span>
                        <span style="font-size: 13px; color: #212529; font-weight: 600;">₹${total.toFixed(
                          2
                        )}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; margin-bottom: 10px; padding-bottom: 10px; border-bottom: 1px solid #dee2e6;">
                        <span style="font-size: 13px; color: #495057; font-weight: 500;">Tax (18% GST)</span>
                        <span style="font-size: 13px; color: #212529; font-weight: 600;">₹${tax.toFixed(
                          2
                        )}</span>
                    </div>
                    <div style="display: flex; justify-content: space-between; background: linear-gradient(135deg, #28a745, #20c997); color: white; padding: 10px; border-radius: 6px; margin: -5px -5px 0;">
                        <span style="font-size: 15px; font-weight: 700;">Grand Total</span>
                        <span style="font-size: 15px; font-weight: 700;">₹${grandTotal.toFixed(
                          2
                        )}</span>
                    </div>
                </div>
            </div>

            <!-- Payment & Service Information -->
            <div style="margin-top: 15px; padding: 10px; border: 1px solid #e9ecef; border-radius: 6px; background-color: #f8f9fa;">
                <p style="font-size: 12px; color: #6c757d; margin: 0; line-height: 1.5;">
                    <strong style="color: #28a745;">Note:</strong> Payment successfully processed. Expected delivery: ${
                      gig?.deliveryTime || "3-5 business days"
                    }. All transactions secured. For support, contact our 24/7 team.
                </p>
            </div>
        </div>

        <!-- Footer -->
        <div style="background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%); padding: 15px 25px; border-top: 1px solid #e9ecef; text-align: center;">
            <div style="display: flex; justify-content: center; align-items: center; gap: 20px; flex-wrap: wrap;">
                <a href="http://www.aiverr.com" style="color: #495057; text-decoration: none; font-size: 12px; font-weight: 500;">www.aiverr.com</a>
                <span style="color: #495057; font-size: 12px; font-weight: 500;">+91-8891804826</span>
                <a href="mailto:support@aiverr.com" style="color: #495057; text-decoration: none; font-size: 12px; font-weight: 500;">support@aiverr.com</a>
            </div>
            <p style="font-size: 10px; color: #6c757d; margin: 8px 0 0; font-weight: 500;">Thank you for choosing Aiverr</p>
        </div>
    </div>
</body>
</html>
  `;
};

function OrderSuccess({ gig, freelancer, order }) {
  console.log("OrderSuccess component rendered with:", {
    gig,
    freelancer,
    order,
  });

  const downloadInvoice = (gig, freelancer, order) => {
    const invoiceHTML = generateInvoiceHTML(
      gig,
      freelancer,
      order,
      userDetails
    );
    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();

      // Close the print window after printing (optional)
      // setTimeout(() => {
      //   printWindow.close();
      // }, 1000);
    };
  };

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);
  const { userDetails } = useSelector((state) => state.auth);
  useEffect(() => {
    // Trigger success animation after component mounts
    const timer = setTimeout(() => setShowSuccessAnimation(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50">
      {/* Subtle Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 right-20 w-64 h-64 bg-gradient-to-br from-emerald-100/20 to-blue-100/20 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 left-20 w-64 h-64 bg-gradient-to-tr from-purple-100/20 to-pink-100/20 rounded-full blur-3xl"></div>
      </div>

      <div className="relative z-10 min-h-screen flex items-center justify-center p-4 lg:p-8">
        {/* Desktop Layout (Landscape) */}
        <div className="hidden lg:block w-full max-w-6xl">
          <div className="grid grid-cols-2 gap-12 items-center">
            {/* Left Side - Success Animation */}
            <div className="text-center">
              <div className="relative mb-8">
                <div
                  className={`w-32 h-32 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto shadow-2xl transition-all duration-1000 ${
                    showSuccessAnimation
                      ? "scale-100 opacity-100"
                      : "scale-75 opacity-0"
                  }`}
                >
                  <CheckCircle2
                    className={`w-16 h-16 text-white transition-all duration-1000 delay-300 ${
                      showSuccessAnimation
                        ? "scale-100 opacity-100"
                        : "scale-0 opacity-0"
                    }`}
                  />
                </div>
                <div
                  className={`absolute -top-4 -right-4 transition-all duration-1000 delay-500 ${
                    showSuccessAnimation
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                >
                  <Trophy className="w-12 h-12 text-yellow-500" />
                </div>
              </div>

              <h1
                className={`text-5xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-4 transition-all duration-1000 delay-700 ${
                  showSuccessAnimation
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                Payment Successful!
              </h1>
              <p
                className={`text-gray-600 text-xl transition-all duration-1000 delay-900 ${
                  showSuccessAnimation
                    ? "translate-y-0 opacity-100"
                    : "translate-y-4 opacity-0"
                }`}
              >
                🎉 Your order is confirmed and the freelancer has been notified
              </p>
            </div>

            {/* Right Side - Order Details */}
            <div
              className={`transition-all duration-1000 delay-1100 ${
                showSuccessAnimation
                  ? "translate-x-0 opacity-100"
                  : "translate-x-8 opacity-0"
              }`}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-8">
                {/* Order Details Card */}
                <div className="bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 mb-8 border border-gray-100">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <img
                        src={freelancer?.picture || "/api/placeholder/50/50"}
                        alt={freelancer?.username || "Freelancer"}
                        className="w-16 h-16 rounded-full object-cover ring-2 ring-emerald-200"
                      />
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-emerald-500 rounded-full flex items-center justify-center">
                        <Check className="w-4 h-4 text-white" />
                      </div>
                    </div>
                    <div className="text-left flex-1">
                      <p className="font-semibold text-gray-900 flex items-center gap-2 text-lg">
                        {freelancer?.username || "Unknown Freelancer"}
                        <Star className="w-5 h-5 text-yellow-500 fill-current" />
                      </p>
                      <p className="text-gray-600 line-clamp-2">
                        {gig?.title || "Service"}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-2xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                        ₹{gig?.price || "0"}
                      </p>
                      <p className="text-sm text-gray-500">Total paid</p>
                    </div>
                  </div>

                  {/* Order Info */}
                  <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Order ID</p>
                      <p className="font-mono text-sm font-semibold">
                        #
                        {order?.id?.toString().slice(-6) ||
                          "ORD-" + Date.now().toString().slice(-6)}
                      </p>
                    </div>
                    <div className="text-center">
                      <p className="text-sm text-gray-500 mb-1">Delivery</p>
                      <p className="text-sm font-semibold flex items-center justify-center gap-1">
                        <Clock className="w-4 h-4" />
                        {gig?.deliveryTime || "3-5 days"}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="space-y-4">
                  <button
                    onClick={() => (window.location.href = "/orders")}
                    className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
                  >
                    <Zap className="w-5 h-5" />
                    View My Orders
                  </button>

                  <div className="grid grid-cols-3 gap-3">
                    <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                      <MessageCircle className="w-6 h-6 text-gray-600 group-hover:text-blue-600 transition-colors" />
                      <span className="text-sm text-gray-600 group-hover:text-blue-600">
                        Message
                      </span>
                    </button>
                    <button className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                      <Heart className="w-6 h-6 text-gray-600 group-hover:text-red-500 transition-colors" />
                      <span className="text-sm text-gray-600 group-hover:text-red-500">
                        Save
                      </span>
                    </button>
                    <button
                      onClick={() => downloadInvoice(gig, freelancer, order)}
                      className="flex flex-col items-center gap-2 p-4 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                    >
                      <TbFileInvoice className="w-6 h-6 text-gray-600 group-hover:text-green-600 transition-colors" />
                      <span className="text-sm text-gray-600 group-hover:text-green-600">
                        Invoice
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Layout (Portrait) */}
        <div className="block lg:hidden w-full max-w-lg">
          <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/20 p-6 text-center relative overflow-hidden">
            {/* Success Animation */}
            <div className="relative mb-6">
              <div
                className={`w-20 h-20 bg-gradient-to-r from-emerald-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg transition-all duration-1000 ${
                  showSuccessAnimation
                    ? "scale-100 opacity-100"
                    : "scale-75 opacity-0"
                }`}
              >
                <CheckCircle2
                  className={`w-10 h-10 text-white transition-all duration-1000 delay-300 ${
                    showSuccessAnimation
                      ? "scale-100 opacity-100"
                      : "scale-0 opacity-0"
                  }`}
                />
              </div>
              <div
                className={`absolute top-0 left-1/2 transform -translate-x-1/2 -translate-y-2 transition-all duration-1000 delay-500 ${
                  showSuccessAnimation
                    ? "scale-100 opacity-100"
                    : "scale-0 opacity-0"
                }`}
              >
                <Trophy className="w-8 h-8 text-yellow-500" />
              </div>
            </div>

            <h1
              className={`text-3xl font-bold bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent mb-3 transition-all duration-1000 delay-700 ${
                showSuccessAnimation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              Payment Successful!
            </h1>
            <p
              className={`text-gray-600 mb-6 text-lg transition-all duration-1000 delay-900 ${
                showSuccessAnimation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              🎉 Your order is confirmed and the freelancer has been notified
            </p>

            {/* Order Details Card */}
            <div
              className={`bg-gradient-to-r from-gray-50 to-blue-50/50 rounded-2xl p-6 mb-6 border border-gray-100 transition-all duration-1000 delay-1100 ${
                showSuccessAnimation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <div className="flex items-center gap-4 mb-4">
                <div className="relative">
                  <img
                    src={freelancer?.picture || "/api/placeholder/50/50"}
                    alt={freelancer?.username || "Freelancer"}
                    className="w-12 h-12 rounded-full object-cover ring-2 ring-emerald-200"
                  />
                  <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-emerald-500 rounded-full flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                </div>
                <div className="text-left flex-1">
                  <p className="font-semibold text-gray-900 flex items-center gap-2">
                    {freelancer?.username || "Unknown Freelancer"}
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  </p>
                  <p className="text-sm text-gray-600 line-clamp-1">
                    {gig?.title || "Service"}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-xl font-bold bg-gradient-to-r from-emerald-600 to-green-600 bg-clip-text text-transparent">
                    ₹{gig?.price || "0"}
                  </p>
                  <p className="text-xs text-gray-500">Total paid</p>
                </div>
              </div>

              {/* Order Info */}
              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-gray-200">
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Order ID</p>
                  <p className="font-mono text-sm font-semibold">
                    #
                    {order?.id?.toString().slice(-6) ||
                      "ORD-" + Date.now().toString().slice(-6)}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs text-gray-500 mb-1">Delivery</p>
                  <p className="text-sm font-semibold flex items-center justify-center gap-1">
                    <Clock className="w-3 h-3" />
                    {gig?.deliveryTime || "3-5 days"}
                  </p>
                </div>
              </div>
            </div>

            {/* Action Buttons */}
            <div
              className={`space-y-3 transition-all duration-1000 delay-1300 ${
                showSuccessAnimation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <button
                onClick={() => (window.location.href = "/orders")}
                className="w-full bg-gradient-to-r from-emerald-600 to-green-600 text-white py-4 px-6 rounded-2xl font-semibold hover:from-emerald-700 hover:to-green-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <Zap className="w-5 h-5" />
                View My Orders
              </button>

              <div className="grid grid-cols-3 gap-3">
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <MessageCircle className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
                  <span className="text-xs text-gray-600 group-hover:text-blue-600">
                    Message
                  </span>
                </button>
                <button className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group">
                  <Heart className="w-5 h-5 text-gray-600 group-hover:text-red-500 transition-colors" />
                  <span className="text-xs text-gray-600 group-hover:text-red-500">
                    Save
                  </span>
                </button>
                <button
                  onClick={() => downloadInvoice(gig, freelancer, order)}
                  className="flex flex-col items-center gap-2 p-3 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
                >
                  <TbFileInvoice className="w-5 h-5 text-gray-600 group-hover:text-green-600 transition-colors" />
                  <span className="text-xs text-gray-600 group-hover:text-green-600">
                    Invoice
                  </span>
                </button>
              </div>
            </div>

            <div
              className={`mt-6 p-4 bg-emerald-50 rounded-xl border border-emerald-200 transition-all duration-1000 delay-1500 ${
                showSuccessAnimation
                  ? "translate-y-0 opacity-100"
                  : "translate-y-4 opacity-0"
              }`}
            >
              <p className="text-sm text-emerald-700">
                <strong>What's next?</strong> The freelancer will start working
                on your project and keep you updated on progress.
              </p>
            </div>
          </div>

          <div
            className={`mt-6 text-center transition-all duration-1000 delay-1700 ${
              showSuccessAnimation
                ? "translate-y-0 opacity-100"
                : "translate-y-4 opacity-0"
            }`}
          >
            <p className="text-sm text-gray-500">
              Need help?{" "}
              <button className="text-blue-600 hover:underline">
                Contact Support
              </button>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PaymentPage() {
  const { getbygigId: gig } = useSelector((state) => state.gig);
  const { freelancer } = useSelector((state) => state.auth);
  const { currentOrder: order } = useSelector((state) => state.order);
  const { id, orderId } = useParams();
  const dispatch = useDispatch();
  const userId = gig?.userId;

  console.log("PaymentPage rendered with:", {
    gig,
    freelancer,
    order,
    id,
    orderId,
  });

  useEffect(() => {
    dispatch(getGigByGigId(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (userId) {
      dispatch(getFreelancerDetails(userId));
    }
  }, [dispatch, userId]);

  useEffect(() => {
    if (orderId) {
      dispatch(getOrderById(orderId));
    }
  }, [dispatch, orderId]);

  const [paymentError, setPaymentError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [billingDetails, setBillingDetails] = useState({
    email: "",
    phone: "",
  });

  // Refs to prevent recreating Stripe elements
  const stripeRef = useRef(null);
  const cardElementRef = useRef(null);
  const elementsRef = useRef(null);
  const mountedRef = useRef(false);

  // Memoized pricing calculations
  const pricing = useMemo(() => {
    const gigPrice =
      typeof gig?.price === "number" ? gig.price : parseFloat(gig?.price) || 0;
    const serviceFee = Math.round(gigPrice * 0.05 * 100) / 100;
    const total = gigPrice + serviceFee;
    return { gigPrice, serviceFee, total };
  }, [gig?.price]);

  // Initialize Stripe only once
  useEffect(() => {
    if (!stripeRef.current && typeof window !== "undefined" && window.Stripe) {
      stripeRef.current = window.Stripe(
        "pk_test_51RRsKCICulaqgJXNm9xWMRwf6zLopsoV9yrdlGUJjkh6m8CN3DZjulhEFYvgspDM7s8e0oQDcB3awj0YGV3SB1IJ00TW31biPE"
      );
    }
  }, []);

  // Setup Stripe Elements only when we have clientSecret and Stripe is loaded
  useEffect(() => {
    if (!order?.clientSecret || mountedRef.current) {
      return;
    }

    const checkStripeAndSetup = () => {
      if (!stripeRef.current) {
        setTimeout(checkStripeAndSetup, 100);
        return;
      }

      const stripe = stripeRef.current;

      try {
        if (!elementsRef.current) {
          elementsRef.current = stripe.elements();
        }

        // Always unmount existing card element if already created
        if (cardElementRef.current) {
          cardElementRef.current.unmount();
          cardElementRef.current = null;
          mountedRef.current = false;
        }

        cardElementRef.current = elementsRef.current.create("card", {
          style: {
            base: {
              fontSize: "16px",
              color: "#1f2937",
              fontFamily:
                "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif",
              fontWeight: "400",
              "::placeholder": { color: "#9ca3af" },
            },
            invalid: {
              color: "#ef4444",
              iconColor: "#ef4444",
            },
          },
        });

        const cardElement = document.getElementById("card-element");
        if (cardElement) {
          cardElementRef.current.mount("#card-element");
          mountedRef.current = true;
          setPaymentError("");
        }
      } catch (error) {
        console.error("Error setting up Stripe Elements:", error);
        setPaymentError(
          "Failed to load payment form. Please refresh the page."
        );
      }
    };

    checkStripeAndSetup();

    // Cleanup function
    return () => {
      if (cardElementRef.current && mountedRef.current) {
        try {
          cardElementRef.current.unmount();
          cardElementRef.current = null;
          mountedRef.current = false;
        } catch (error) {
          console.error("Error unmounting card element:", error);
        }
      }
    };
  }, [order?.clientSecret]);

  const validateForm = useCallback(() => {
    if (!billingDetails.email || !billingDetails.email.includes("@")) {
      setPaymentError("Please enter a valid email address");
      return false;
    }
    if (!cardElementRef.current || !mountedRef.current) {
      setPaymentError("Payment form not ready. Please wait and try again.");
      return;
    }
    if (!order?.clientSecret) {
      setPaymentError("Payment information not available. Please try again.");
      return false;
    }
    return true;
  }, [billingDetails.email, order?.clientSecret]);

  const handlePayment = useCallback(async () => {
    if (!validateForm() || isProcessing) return;

    setIsProcessing(true);
    setPaymentError("");

    try {
      const stripe = stripeRef.current;
      const cardElement = cardElementRef.current;

      if (!stripe || !cardElement) {
        throw new Error("Stripe not properly initialized");
      }

      console.log("Card element:", cardElementRef.current);
      console.log("Client secret:", order.clientSecret);
      console.log("Billing details:", billingDetails);

      const result = await stripe.confirmCardPayment(order.clientSecret, {
        payment_method: {
          card: cardElement,
          billing_details: {
            email: billingDetails.email,
            phone: billingDetails.phone,
          },
        },
      });

      if (result.error) {
        setPaymentError(result.error.message);
        return;
      }

      if (result.paymentIntent.status === "succeeded") {
        // Confirm payment with backend
        await dispatch(
          confirmOrderPayment({
            orderId: order.id,
            paymentIntentId: order.paymentIntentId,
          })
        ).unwrap();

        setPaymentSuccess(true);
      } else {
        setPaymentError(
          `Payment not completed: ${result.paymentIntent.status}`
        );
      }
    } catch (error) {
      console.error("Payment error:", error);
      setPaymentError(error.message || "Payment failed. Please try again.");
    } finally {
      setIsProcessing(false);
    }
  }, [validateForm, isProcessing, order, billingDetails, dispatch]);

  const handleBillingChange = useCallback((field, value) => {
    setBillingDetails((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  // Show success page
  if (paymentSuccess) {
    return <OrderSuccess gig={gig} freelancer={freelancer} order={order} />;
  }

  // Show loading if no order data
  if (!order?.clientSecret) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600 text-lg">Loading payment form...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-blue-50">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <button
            onClick={() => window.history.back()}
            className="flex items-center gap-2 text-gray-600 hover:text-gray-800 mb-6 transition-colors hover:bg-white rounded-lg px-3 py-2 group"
          >
            <ArrowLeft
              size={20}
              className="group-hover:-translate-x-1 transition-transform"
            />
            <span>Back to order</span>
          </button>
          <div className="text-center">
            <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-2">
              Secure Payment
            </h1>
            <p className="text-gray-600 text-lg">
              Complete your order with our secure payment system
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Payment Form */}
          <div className="lg:col-span-2 space-y-6">
            {/* Billing Information */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-blue-100 rounded-lg flex items-center justify-center">
                  <User size={18} className="text-blue-600" />
                </div>
                Billing Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    value={billingDetails.email}
                    onChange={(e) =>
                      handleBillingChange("email", e.target.value)
                    }
                    placeholder="john@example.com"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-700">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    value={billingDetails.phone}
                    onChange={(e) =>
                      handleBillingChange("phone", e.target.value)
                    }
                    placeholder="+91 9876543210"
                    className="w-full px-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8">
              <h2 className="text-2xl font-semibold mb-6 flex items-center gap-3">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <CreditCard size={18} className="text-green-600" />
                </div>
                Payment Method
              </h2>

              <div className="space-y-6">
                <div className="flex items-center gap-4 p-4 border border-gray-200 rounded-xl bg-blue-50">
                  <div className="w-4 h-4 bg-blue-600 rounded-full flex items-center justify-center">
                    <div className="w-2 h-2 bg-white rounded-full"></div>
                  </div>
                  <CreditCard size={20} className="text-blue-600" />
                  <span className="font-medium">Credit/Debit Card</span>
                  <div className="ml-auto flex gap-2">
                    <div className="w-8 h-5 bg-blue-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      VISA
                    </div>
                    <div className="w-8 h-5 bg-red-600 rounded text-white text-xs flex items-center justify-center font-bold">
                      MC
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div
                    id="card-element"
                    className="border border-gray-200 rounded-xl p-4 min-h-[50px] bg-white focus-within:ring-2 focus-within:ring-blue-500 focus-within:border-transparent transition-all"
                  ></div>

                  {paymentError && (
                    <div className="p-4 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3">
                      <div className="w-5 h-5 bg-red-100 rounded-full flex items-center justify-center mt-0.5">
                        <div className="w-2 h-2 bg-red-600 rounded-full"></div>
                      </div>
                      <p className="text-red-700 text-sm">{paymentError}</p>
                    </div>
                  )}

                  <button
                    onClick={handlePayment}
                    disabled={isProcessing || !mountedRef.current}
                    className="w-full bg-gradient-to-r from-green-600 to-emerald-600 text-white py-4 px-6 rounded-xl font-semibold hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 disabled:transform-none flex items-center justify-center gap-3"
                  >
                    {isProcessing ? (
                      <>
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Processing Payment...</span>
                      </>
                    ) : (
                      <>
                        <Shield size={18} />
                        <span>Pay ₹{pricing.total.toFixed(2)}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-lg border border-white/20 p-8 sticky top-8">
              <h3 className="text-xl font-semibold mb-6">Order Summary</h3>

              <div className="border-b border-gray-200 pb-6 mb-6">
                <div className="flex items-start gap-4">
                  <img
                    src={gig?.imageUrl1 || "/api/placeholder/80/80"}
                    alt={gig?.title || "Service"}
                    className="w-20 h-20 rounded-xl object-cover shadow-md"
                  />
                  <div className="flex-1">
                    <h4 className="font-semibold text-gray-900 leading-tight mb-2">
                      {gig?.title || "Service Title"}
                    </h4>
                    <p className="text-sm text-gray-500 mb-2">
                      {gig?.category || "Service Category"}
                    </p>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-400 fill-current" />
                        <span className="text-sm text-gray-600">4.9</span>
                      </div>
                      <span className="text-gray-300">•</span>
                      <span className="text-sm text-gray-600">Best Seller</span>
                    </div>
                  </div>
                </div>
              </div>

              {freelancer && (
                <div className="border-b border-gray-200 pb-6 mb-6">
                  <div className="flex items-center gap-3">
                    <img
                      src={freelancer.picture || "/api/placeholder/40/40"}
                      alt={freelancer.username || "Freelancer"}
                      className="w-10 h-10 rounded-full object-cover ring-2 ring-gray-200"
                    />
                    <div className="flex-1">
                      <p className="font-medium text-gray-900 text-sm">
                        {freelancer.username || "Freelancer"}
                      </p>
                      <p className="text-xs text-gray-500">
                        Professional Seller
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Pricing Breakdown */}
              <div className="space-y-3 mb-6">
                <div className="flex justify-between text-gray-600">
                  <span>Service Price</span>
                  <span>₹{pricing.gigPrice.toFixed(2)}</span>
                </div>
                <div className="flex justify-between text-gray-600">
                  <span>Service Fee</span>
                  <span>₹{pricing.serviceFee.toFixed(2)}</span>
                </div>
                <div className="border-t border-gray-200 pt-3">
                  <div className="flex justify-between text-lg font-semibold">
                    <span>Total</span>
                    <span className="text-green-600">
                      ₹{pricing.total.toFixed(2)}
                    </span>
                  </div>
                </div>
              </div>

              {/* Delivery Info */}
              <div className="bg-gray-50 rounded-xl p-4">
                <div className="flex items-center gap-3 mb-2">
                  <Clock className="w-5 h-5 text-gray-600" />
                  <span className="font-medium text-gray-900">
                    Delivery Time
                  </span>
                </div>
                <p className="text-sm text-gray-600">
                  {gig?.deliveryTime || "3-5 business days"}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaymentPage;
