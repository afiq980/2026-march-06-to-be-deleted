{
  "screens": [
    {
      "name": "Home Screen",
      "sections": [
        {
          "type": "header",
          "content": {
            "greeting": "Hello, Jack,",
            "subtext": "You have work today",
            "icons": [
              {
                "type": "notification",
                "position": "top-right"
              },
              {
                "type": "menu",
                "position": "top-right"
              }
            ]
          }
        },
        {
          "type": "summary_cards",
          "cards": [
            {
              "title": "Today",
              "count": 6,
              "color": "blue"
            },
            {
              "title": "Scheduled",
              "count": 5,
              "color": "yellow"
            },
            {
              "title": "All",
              "count": 14,
              "color": "blue"
            },
            {
              "title": "Overdue",
              "count": 3,
              "color": "yellow"
            }
          ]
        },
        {
          "type": "task_list",
          "title": "Today's Task",
          "tasks": [
            {
              "time": "4:50 PM",
              "title": "Project retrospective",
              "status": "incomplete"
            },
            {
              "time": "4:50 PM",
              "title": "Evening team meeting",
              "status": "incomplete"
            },
            {
              "time": "Today",
              "title": "Create monthly deck",
              "status": "incomplete"
            },
            {
              "time": "6:00 PM",
              "title": "Shop for groceries",
              "status": "incomplete",
              "subtasks": [
                "Pick up bag",
                "Rice",
                "Meat"
              ]
            },
            {
              "time": "Yesterday",
              "title": "Read book",
              "status": "complete"
            }
          ],
          "add_task_button": {
            "icon": "plus",
            "position": "bottom-right"
          }
        }
      ]
    },
    {
      "name": "All Task List Screen",
      "sections": [
        {
          "type": "task_categories",
          "categories": [
            {
              "title": "Grocery",
              "notes_count": 15,
              "completed_count": 7,
              "color": "yellow"
            },
            {
              "title": "Educational",
              "notes_count": 6,
              "completed_count": 2,
              "color": "blue"
            },
            {
              "title": "Home Related",
              "notes_count": 8,
              "completed_count": 5,
              "color": "yellow"
            },
            {
              "title": "Work Related",
              "notes_count": 14,
              "completed_count": 12,
              "color": "blue"
            },
            {
              "title": "Mandatory Work",
              "notes_count": 3,
              "completed_count": 2,
              "color": "yellow"
            },
            {
              "title": "Personal Notes",
              "notes_count": 3,
              "completed_count": 2,
              "color": "blue"
            }
          ]
        }
      ]
    }
  ],
  "design_elements": {
    "colors": {
      "blue": "#AFCBFF",
      "yellow": "#FFEBA1",
      "green": "#AFCBFF",
      "pink": "#FFEBA1",
      "teal": "#AFCBFF"
    },
    "typography": {
      "header_font": "Sans-serif, bold",
      "subtext_font": "Sans-serif, regular",
      "task_font": "Sans-serif, medium"
    },
    "icons": {
      "notification": "bell",
      "menu": "three-dots",
      "add_task": "plus"
    },
    "layout": {
      "spacing": "consistent padding and margin between elements",
      "alignment": "centered and aligned for readability",
      "rounded_corners": true
    }
  }
}
