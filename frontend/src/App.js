import React, { useState, useEffect } from "react";

function App() {
  const [name, setName] = useState("");
  const [comment, setComment] = useState("");
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(false);

  // Fetch feedbacks
      const getFeedbacks = async () => {
      const res = await fetch("http://localhost:5000/feedback");
      const data = await res.json();
              setFeedbacks(data);
       };

        useEffect(() => {
                    getFeedbacks();
           }, []);

  // Handle submit
        const handleSubmit = async (e) => {
          e.preventDefault();
         if (!name || !comment) return alert("Please fill all fields");
         setLoading(true);
                 await fetch("http://localhost:5000/feedback", {
                 method: "POST",
                 headers: { "Content-Type": "application/json" },
                 body: JSON.stringify({ name, comment }),
       });
         setName("");
         setComment("");
         await getFeedbacks();
         setLoading(false);
         };

         return (
         <div style={{ width: "400px", margin: "auto", textAlign: "center" }}>
         <h2>Product Feedback Dashboard</h2>
         <form onSubmit={handleSubmit}>
         <input
           type="text"
           placeholder="Your Name"
           value={name}
           onChange={(e) => setName(e.target.value)}
           style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                                                                  />
          <textarea
          placeholder="Your Comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          style={{ width: "100%", marginBottom: "10px", padding: "8px" }}
                                                         />
           <button type="submit" disabled={loading}>
          {loading ? "Submitting..." : "Submit Feedback"}
                                </button>
                  </form>

          <h3>All Feedbacks</h3>
         {feedbacks.length === 0 ? (
         <p>No feedback yet</p>
           ) : (
        feedbacks.map((f) => (
       <div key={f.id} style={{ border: "1px solid #ccc", margin: "8px", padding: "8px" }}>
        <b>{f.name}</b>
        <p>{f.comment}</p>
         </div>
              ))
          )}
          </div>
         );
}

 export default App;
