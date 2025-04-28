import React, { useState } from "react";

export const GigForm = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    title: "",
    price: null,
    category: "",
    tags: [],
    imageUrl1: "",
    imageUrl2: "",
    imageUrl3: "",
    videoUrl: "",
    thumbnailUrl: "",
    deliveryTime: null,
    revisions: null,
    userId: null,
  });

  return (<div>
    
  </div>);
};
