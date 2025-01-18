import React, { useState } from "react";

const DietPlan = () => {
  const [age, setAge] = useState("");
  const [weight, setWeight] = useState("");
  const [activityLevel, setActivityLevel] = useState("");
  const [goal, setGoal] = useState("");
  const [dietPlanResult, setDietPlanResult] = useState(null);

  const calculateCalories = (baseCalories) => {
    switch (goal) {
      case "lose_fat":
        return Math.round(baseCalories * 0.85); // 15% deficit
      case "bulk":
        return Math.round(baseCalories * 1.15); // 15% surplus
      default:
        return baseCalories; // maintain weight
    }
  };

  const generateDietPlan = (e) => {
    e.preventDefault();

    if (!age || !weight || !activityLevel || !goal) {
      return;
    }

    let dietPlan = {
      calories: 0,
      meals: [],
      tips: ""
    };
    
    let baseCalories;
    let mealPlan;
    
    if (age < 30) {
      baseCalories = activityLevel === "sedentary" ? weight * 30 : weight * 35;
    } else {
      baseCalories = activityLevel === "sedentary" ? weight * 28 : weight * 33;
    }

    const adjustedCalories = calculateCalories(baseCalories);

    // Base meal structure depending on goal
    if (goal === "lose_fat") {
      mealPlan = {
        breakfast: {
          title: "Breakfast",
          food: "High protein, low carb breakfast: "
        },
        morningSnack: {
          title: "Morning Snack",
          food: "Low calorie protein snack: "
        },
        lunch: {
          title: "Lunch",
          food: "Lean protein with vegetables: "
        },
        afternoonSnack: {
          title: "Afternoon Snack",
          food: "Fiber-rich snack: "
        },
        dinner: {
          title: "Dinner",
          food: "Light protein with vegetables: "
        }
      };
    } else if (goal === "bulk") {
      mealPlan = {
        breakfast: {
          title: "Breakfast",
          food: "Calorie-dense breakfast: "
        },
        morningSnack: {
          title: "Morning Snack",
          food: "High protein snack: "
        },
        lunch: {
          title: "Lunch",
          food: "High protein lunch: "
        },
        afternoonSnack: {
          title: "Afternoon Snack",
          food: "Calorie-dense snack: "
        },
        dinner: {
          title: "Dinner",
          food: "Protein-rich dinner: "
        },
        eveningSnack: {
          title: "Evening Snack",
          food: "Protein shake: "
        }
      };
    } else {
      mealPlan = {
        breakfast: {
          title: "Breakfast",
          food: "Balanced breakfast: "
        },
        morningSnack: {
          title: "Morning Snack",
          food: "Healthy snack: "
        },
        lunch: {
          title: "Lunch",
          food: "Balanced lunch: "
        },
        afternoonSnack: {
          title: "Afternoon Snack",
          food: "Light snack: "
        },
        dinner: {
          title: "Dinner",
          food: "Balanced dinner: "
        }
      };
    }

    // Add specific meals based on activity level and goal
    if (activityLevel === "sedentary") {
      if (goal === "lose_fat") {
        dietPlan = {
          calories: adjustedCalories,
          meals: [
            { ...mealPlan.breakfast, food: mealPlan.breakfast.food + "Egg white omelet with spinach and tomatoes" },
            { ...mealPlan.morningSnack, food: mealPlan.morningSnack.food + "Greek yogurt with berries" },
            { ...mealPlan.lunch, food: mealPlan.lunch.food + "Grilled chicken salad with light dressing" },
            { ...mealPlan.afternoonSnack, food: mealPlan.afternoonSnack.food + "Celery sticks with hummus" },
            { ...mealPlan.dinner, food: mealPlan.dinner.food + "Baked fish with steamed vegetables" }
          ],
          tips: "Focus on high protein, low calorie foods. Avoid sugary drinks and processed foods. Stay hydrated."
        };
      } else if (goal === "bulk") {
        dietPlan = {
          calories: adjustedCalories,
          meals: [
            { ...mealPlan.breakfast, food: mealPlan.breakfast.food + "Oatmeal with protein powder, banana, and peanut butter" },
            { ...mealPlan.morningSnack, food: mealPlan.morningSnack.food + "Trail mix with nuts and dried fruits" },
            { ...mealPlan.lunch, food: mealPlan.lunch.food + "Turkey sandwich with avocado and whole grain bread" },
            { ...mealPlan.afternoonSnack, food: mealPlan.afternoonSnack.food + "Protein bar and banana" },
            { ...mealPlan.dinner, food: mealPlan.dinner.food + "Beef stir-fry with brown rice" },
            { ...mealPlan.eveningSnack, food: mealPlan.eveningSnack.food + "Casein protein shake with milk" }
          ],
          tips: "Eat frequently, focus on calorie-dense foods. Include protein with every meal."
        };
      } else {
        dietPlan = {
          calories: adjustedCalories,
          meals: [
            { ...mealPlan.breakfast, food: mealPlan.breakfast.food + "Whole grain toast with eggs and avocado" },
            { ...mealPlan.morningSnack, food: mealPlan.morningSnack.food + "Apple with almond butter" },
            { ...mealPlan.lunch, food: mealPlan.lunch.food + "Quinoa bowl with chickpeas and vegetables" },
            { ...mealPlan.afternoonSnack, food: mealPlan.afternoonSnack.food + "Handful of mixed nuts" },
            { ...mealPlan.dinner, food: mealPlan.dinner.food + "Grilled chicken with sweet potato" }
          ],
          tips: "Maintain balanced meals with protein, carbs, and healthy fats. Stay consistent with portion sizes."
        };
      }
    } else {
      // Active lifestyle meals
      if (goal === "lose_fat") {
        dietPlan = {
          calories: adjustedCalories,
          meals: [
            { ...mealPlan.breakfast, food: mealPlan.breakfast.food + "Protein smoothie with berries and greens" },
            { ...mealPlan.morningSnack, food: mealPlan.morningSnack.food + "Rice cake with turkey breast" },
            { ...mealPlan.lunch, food: mealPlan.lunch.food + "Tuna salad with light mayo on lettuce" },
            { ...mealPlan.afternoonSnack, food: mealPlan.afternoonSnack.food + "Protein shake with water" },
            { ...mealPlan.dinner, food: mealPlan.dinner.food + "Lean ground turkey with vegetables" }
          ],
          tips: "Time meals around workouts. Focus on protein and post-workout nutrition. Stay hydrated."
        };
      } else if (goal === "bulk") {
        dietPlan = {
          calories: adjustedCalories,
          meals: [
            { ...mealPlan.breakfast, food: mealPlan.breakfast.food + "Whole eggs with oatmeal and protein shake" },
            { ...mealPlan.morningSnack, food: mealPlan.morningSnack.food + "Mass gainer shake with banana" },
            { ...mealPlan.lunch, food: mealPlan.lunch.food + "Chicken breast with rice and olive oil" },
            { ...mealPlan.afternoonSnack, food: mealPlan.afternoonSnack.food + "Peanut butter sandwich with milk" },
            { ...mealPlan.dinner, food: mealPlan.dinner.food + "Salmon with quinoa and avocado" },
            { ...mealPlan.eveningSnack, food: mealPlan.eveningSnack.food + "Greek yogurt with honey and nuts" }
          ],
          tips: "Eat 1-2 hours before workout. Have a post-workout meal within 30 minutes. Focus on progressive overload in training."
        };
      } else {
        dietPlan = {
          calories: adjustedCalories,
          meals: [
            { ...mealPlan.breakfast, food: mealPlan.breakfast.food + "Breakfast burrito with eggs and vegetables" },
            { ...mealPlan.morningSnack, food: mealPlan.morningSnack.food + "Protein bar" },
            { ...mealPlan.lunch, food: mealPlan.lunch.food + "Grilled chicken with rice and vegetables" },
            { ...mealPlan.afternoonSnack, food: mealPlan.afternoonSnack.food + "Fruit smoothie" },
            { ...mealPlan.dinner, food: mealPlan.dinner.food + "Fish with quinoa and roasted vegetables" }
          ],
          tips: "Balance your macros. Time meals around workouts. Stay hydrated throughout the day."
        };
      }
    }

    setDietPlanResult(dietPlan);
  };

  return (
    <section className="diet-plan">
      <h1>PERSONALIZED DIET PLAN</h1>
      <div className="container">
        <div className="wrapper">
          <form onSubmit={generateDietPlan}>
            <div>
              <label>Age</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Weight (kg)</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                required
              />
            </div>
            <div>
              <label>Activity Level</label>
              <select
                value={activityLevel}
                onChange={(e) => setActivityLevel(e.target.value)}
                required
              >
                <option value="">Select Activity Level</option>
                <option value="sedentary">Sedentary (Little to no exercise)</option>
                <option value="active">Active (Regular exercise)</option>
              </select>
            </div>
            <div>
              <label>Goal</label>
              <select
                value={goal}
                onChange={(e) => setGoal(e.target.value)}
                required
              >
                <option value="">Select Your Goal</option>
                <option value="lose_fat">Lose Fat</option>
                <option value="maintain">Maintain Weight</option>
                <option value="bulk">Bulk Up</option>
              </select>
            </div>
            <button type="submit">Generate Diet Plan</button>
          </form>
          
          {dietPlanResult && (
            <div className="diet-plan-result">
              <h2>Your Personalized Diet Plan</h2>
              <div className="calorie-info">
                <h3>Daily Calorie Need: {dietPlanResult.calories} calories</h3>
                <p className="goal-text">
                  {goal === 'lose_fat' && '(Caloric deficit for fat loss)'}
                  {goal === 'bulk' && '(Caloric surplus for muscle gain)'}
                  {goal === 'maintain' && '(Maintenance calories)'}
                </p>
              </div>
              <div className="meal-plan">
                {dietPlanResult.meals.map((meal, index) => (
                  <div key={index} className="meal-item">
                    <h4>{meal.title}</h4>
                    <p>{meal.food}</p>
                  </div>
                ))}
              </div>
              <div className="tips">
                <h4>Tips:</h4>
                <p>{dietPlanResult.tips}</p>
              </div>
            </div>
          )}
        </div>
        <div className="wrapper">
          <img src="/diet.jpg" alt="healthyDiet" style={{ width: '100%', height: 'auto', marginTop: '2rem' }} />
        </div>
      </div>
    </section>
  );
};

export default DietPlan; 