import json

def get_new_streamer_details():
    title = input("Enter the name of the streamer:\n")
    logo = input("Enter the url of the streamer url:\n")

    plans = []
    moreplans = True

    while moreplans:
        plan_title = input(f"Name of plan {len(plans)+1}:\n")
        plan_price = input(f"Price of plan {len(plans)+1}:\n")

        ads = False
        if input(f"Does plan {len(plans)+1} include ads (y/n):\n").lower() == ["yes", "y"]:
            ads = True

        points = []
        morepoints = True
        while morepoints:
            points.append(input(f"Enter the next point for plan {len(plans)+1}:\n"))
            morepoints = points[-1] != ""
        points = points[:-1]

        plans.append({
            "name": plan_title,
            "price": plan_price,
            "ads": ads,
            "points": points
        })

        moreplans = input("Press Enter to continue with another plan?\n") == ""

    return {
        "title": title,
        "logo": logo,
        "plans": plans
    }

def add_new_streamer_to_file(streamer):
    with open("./src/assets/streamers.json", "r") as file:
        file_data = json.load(file)
        file_data.append(streamer)

    with open("./src/assets/streamers.json", "w") as file:
        json.dump(file_data, file)

if __name__ == "__main__":

    new_streamer = get_new_streamer_details()
    add_new_streamer_to_file(new_streamer)
