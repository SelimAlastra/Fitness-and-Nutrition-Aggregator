import ProfessionalProfile from './ProfessionalProfile';

function App() {
  return (
    <div className="App">
      <ProfessionalProfile 
      name="Joshua Harris"
      location="London, UK"
      description="I'm a freelance health ad fitness advisor excited to help people acheive their goals!"
      instagramLink="https://www.instagram.com"
      youtubeLink="https://www.youtube.com"
      profileImage="https://images.unsplash.com/photo-1588420343618-6141b3784bce?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1000&q=80"     
      services={["Nutritional Advice", "Nutritional Advice","Nutritional Advice", "Nutritional Advice"]}
      tags={["#HealthyEating", "#NutritionAdvice", "#MealPreperation", "#Abs", "#Tummy"]}
      videoUrls={["https://www.youtube.com/watch?v=u8ORhMyvH6A", "https://www.youtube.com/watch?v=0BHnzEJUte8&t=12s","https://www.youtube.com/watch?v=X8zLJlU_-60" ]}
      />
    </div>
  );
}

export default App;