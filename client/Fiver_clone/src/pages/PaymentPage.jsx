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
  Calendar,
  Clock,
  User,
  MessageCircle,
  Download,
  Heart,
  Share2,
  Sparkles,
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

const generateInvoiceHTML = (gig, freelancer, order) => {
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
    <html>
    <head>
        <meta charset="utf-8">
        <style>
            body {
                font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
                margin: 0;
                padding: 40px;
                background: #f8f9fa;
                color: #333;
            }
            .invoice-container {
                max-width: 800px;
                margin: 0 auto;
                background: white;
                border-radius: 12px;
                box-shadow: 0 4px 20px rgba(0,0,0,0.1);
                overflow: hidden;
            }
            .header {
                background: linear-gradient(135deg, #059669 0%, #10b981 100%);
                color: white;
                padding: 40px;
                position: relative;
            }
            .header::after {
                content: '';
                position: absolute;
                bottom: -20px;
                right: 0;
                width: 200px;
                height: 200px;
                background: rgba(255,255,255,0.1);
                border-radius: 50%;
            }
            .logo {
                font-size: 24px;
                font-weight: bold;
                margin-bottom: 10px;
            }
            .invoice-title {
                font-size: 48px;
                font-weight: bold;
                margin: 0;
                text-align: right;
                position: relative;
                z-index: 1;
            }
            .content {
                padding: 40px;
            }
            .details-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 40px;
                margin-bottom: 40px;
            }
            .section-title {
                font-size: 18px;
                font-weight: bold;
                color: #059669;
                margin-bottom: 15px;
                text-transform: uppercase;
                letter-spacing: 1px;
            }
            .detail-item {
                margin-bottom: 8px;
            }
            .detail-label {
                font-weight: 600;
                color: #6b7280;
                font-size: 14px;
            }
            .detail-value {
                font-size: 16px;
                color: #111827;
            }
            .items-table {
                width: 100%;
                border-collapse: collapse;
                margin-bottom: 30px;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            }
            .items-table th {
                background: #059669;
                color: white;
                padding: 15px;
                text-align: left;
                font-weight: 600;
            }
            .items-table td {
                padding: 15px;
                border-bottom: 1px solid #e5e7eb;
            }
            .items-table tbody tr:hover {
                background: #f9fafb;
            }
            .totals {
                background: #f8f9fa;
                padding: 30px;
                border-radius: 8px;
                margin-top: 20px;
            }
            .total-row {
                display: flex;
                justify-content: space-between;
                margin-bottom: 10px;
                padding: 5px 0;
            }
            .total-label {
                font-weight: 500;
            }
            .total-value {
                font-weight: 600;
            }
            .grand-total {
                border-top: 2px solid #059669;
                padding-top: 15px;
                margin-top: 15px;
                font-size: 20px;
                font-weight: bold;
                color: #059669;
            }
            .notes {
                background: #ecfdf5;
                border-left: 4px solid #059669;
                padding: 20px;
                margin-top: 30px;
                border-radius: 0 8px 8px 0;
            }
            .notes-title {
                font-weight: bold;
                margin-bottom: 10px;
                color: #059669;
            }
            .footer {
                background: #1f2937;
                color: white;
                padding: 30px;
                text-align: center;
            }
            .footer-content {
                display: flex;
                justify-content: space-around;
                align-items: center;
                flex-wrap: wrap;
                gap: 20px;
            }
            @media print {
                body { background: white; padding: 0; }
                .invoice-container { box-shadow: none; }
            }
        </style>
    </head>
    <body>
        <div class="invoice-container">
            <div class="header">
                <div class="logo">🚀 FreelanceHub</div>
                <h1 class="invoice-title">INVOICE</h1>
            </div>
            
            <div class="content">
                <div class="details-grid">
                    <div>
                        <div class="section-title">Invoice To</div>
                        <div class="detail-item">
                            <div class="detail-label">Client</div>
                            <div class="detail-value">Mr. Client</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Email</div>
                            <div class="detail-value">client@example.com</div>
                        </div>
                    </div>
                    
                    <div>
                        <div class="section-title">Invoice Details</div>
                        <div class="detail-item">
                            <div class="detail-label">Invoice Number</div>
                            <div class="detail-value">#${orderId}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Date</div>
                            <div class="detail-value">${currentDate}</div>
                        </div>
                        <div class="detail-item">
                            <div class="detail-label">Order ID</div>
                            <div class="detail-value">#${orderId}</div>
                        </div>
                    </div>
                </div>

                <div class="section">
                    <div class="section-title">Service Provider</div>
                    <div class="detail-item">
                        <div class="detail-label">Freelancer</div>
                        <div class="detail-value">${
                          freelancer?.username || "Professional Freelancer"
                        }</div>
                    </div>
                    <div class="detail-item">
                        <div class="detail-label">Service Category</div>
                        <div class="detail-value">${
                          gig?.category || "Digital Services"
                        }</div>
                    </div>
                </div>

                <table class="items-table">
                    <thead>
                        <tr>
                            <th>Service Description</th>
                            <th>Quantity</th>
                            <th>Rate</th>
                            <th>Amount</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>
                                <strong>${
                                  gig?.title || "Professional Service"
                                }</strong><br>
                                <small style="color: #6b7280;">${
                                  gig?.category || "Digital Service"
                                }</small>
                            </td>
                            <td>1</td>
                            <td>₹${gigPrice.toFixed(2)}</td>
                            <td>₹${gigPrice.toFixed(2)}</td>
                        </tr>
                        <tr>
                            <td>
                                <strong>Platform Service Fee</strong><br>
                                <small style="color: #6b7280;">Processing & Support (5%)</small>
                            </td>
                            <td>1</td>
                            <td>₹${serviceFee.toFixed(2)}</td>
                            <td>₹${serviceFee.toFixed(2)}</td>
                        </tr>
                    </tbody>
                </table>

                <div class="totals">
                    <div class="total-row">
                        <span class="total-label">Subtotal:</span>
                        <span class="total-value">₹${total.toFixed(2)}</span>
                    </div>
                    <div class="total-row">
                        <span class="total-label">GST (18%):</span>
                        <span class="total-value">₹${tax.toFixed(2)}</span>
                    </div>
                    <div class="total-row grand-total">
                        <span class="total-label">Grand Total:</span>
                        <span class="total-value">₹${grandTotal.toFixed(
                          2
                        )}</span>
                    </div>
                </div>

                <div class="notes">
                    <div class="notes-title">Payment Terms & Notes:</div>
                    <p>✅ Payment has been successfully processed</p>
                    <p>📋 Service delivery time: ${
                      gig?.deliveryTime || "3-5 business days"
                    }</p>
                    <p>🔒 This transaction is secured and protected</p>
                    <p>💬 For any queries, please contact our support team</p>
                </div>
            </div>

            <div class="footer">
                <div class="footer-content">
                    <div>🌐 freelancehub.com</div>
                    <div>📞 +91-123-456-7890</div>
                    <div>✉️ support@freelancehub.com</div>
                </div>
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
    const invoiceHTML = generateInvoiceHTML(gig, freelancer, order);

    // Create a new window for printing
    const printWindow = window.open("", "_blank");
    printWindow.document.write(invoiceHTML);
    printWindow.document.close();

    // Wait for content to load then trigger print
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();

      // Close the print window after printing (optional)
      setTimeout(() => {
        printWindow.close();
      }, 1000);
    };
  };

  const [showSuccessAnimation, setShowSuccessAnimation] = useState(false);

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
