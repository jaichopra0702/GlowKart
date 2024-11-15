import { useNavigate } from "react-router-dom";

const ThankYouPage = () => {
  const navigate = useNavigate();

  const handleSeeRecommendations = () => {
    navigate("/recommendations");
  };

  return (
    <div>
      <h1>Thank You for Taking the Quiz!</h1>
      <button onClick={handleSeeRecommendations}>
        See Recommendations
      </button>
    </div>
  );
};

export default ThankYouPage;
