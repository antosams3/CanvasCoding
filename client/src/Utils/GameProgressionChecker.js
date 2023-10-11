import API from "../API/API"

export default async function gameProgressionChecker(addType, selectObj, objects, counter, code, currentStep, levelSteps, handleMessage) {
    try {
        switch (currentStep?.id) {
            case 1:
            // Check if addType === BOX, SPHERE ...
                if (addType !== null) {                    
                    console.log("Step 1 completed");
                    return await API.putNextLevel(code);
                }
                break;
            case 2:
                if (objects.length > 0){
                    console.log("Step 2 completed");
                    return await API.putNextLevel(code);
                }
                break;
            case 3:
                if (counter >= 5){
                    console.log("Step 3 completed");
                    return await API.putNextLevel(code);
                }
                break;
            default: break;
        }
    } catch (err) {
        handleMessage({ severity: "error", content: err })
    }

}