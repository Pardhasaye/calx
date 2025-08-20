document.addEventListener("DOMContentLoaded", () => {
  // Get elements
  const sidebar = document.getElementById("sidebar")
  const menuToggle = document.getElementById("menu-toggle")
  const closeSidebar = document.getElementById("close-sidebar")
  const calendarView = document.getElementById("calendar-view")
  const imageView = document.getElementById("image-view")
  const monthImage = document.getElementById("month-image")
  const imageDownloadLink = document.getElementById("image-download-link")
  const imageMonthTitle = document.getElementById("image-month-title")
  const backToCalendarBtn = document.getElementById("back-to-calendar")

  // Update current date and time
  function updateDateTime() {
    const now = new Date()

    // Format date: DD-MM-YYYY
    const date = now
      .toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      })
      .replace(/\//g, "-")

    // Format time: HH:MM:SS AM/PM
    const time = now.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    })

    document.getElementById("current-date").textContent = `DATE: ${date}`
    document.getElementById("current-time").textContent = `TIME: ${time}`
  }

  // Update time immediately and then every second
  updateDateTime()
  setInterval(updateDateTime, 1000)

  // Toggle sidebar
  menuToggle.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.toggle("active")
    } else {
      sidebar.classList.toggle("collapsed")
    }
  })

  // Close sidebar
  closeSidebar.addEventListener("click", () => {
    if (window.innerWidth <= 768) {
      sidebar.classList.remove("active")
    } else {
      sidebar.classList.add("collapsed")
    }
  })

  // Handle month card clicks
  const monthCards = document.querySelectorAll(".month-card")
  monthCards.forEach((card) => {
    card.addEventListener("click", function () {
      const month = this.getAttribute("data-month")
      openMonthImage(month)
    })
  })

  // Handle sidebar month links
  const monthLinks = document.querySelectorAll("#month-list a")
  monthLinks.forEach((link) => {
    link.addEventListener("click", function (e) {
      e.preventDefault()
      const month = this.getAttribute("data-month")
      openMonthImage(month)

      // Close sidebar on mobile after selection
      if (window.innerWidth <= 768) {
        sidebar.classList.remove("active")
      }
    })
  })

  // Back to calendar button
  backToCalendarBtn.addEventListener("click", () => {
    showCalendarView()
  })

  // Function to open image for a specific month
  function openMonthImage(month) {
    // Image path - supports multiple formats
    const imagePath = `images/${month}.jpg` // You can use .jpg, .png, etc.

    // Set the image source
    monthImage.src = imagePath
    monthImage.alt = `${month.charAt(0).toUpperCase() + month.slice(1)} Calendar`

    // Set the download link
    imageDownloadLink.href = imagePath
    imageDownloadLink.download = `${month}-calendar.jpg`

    // Set the month title with proper capitalization
    imageMonthTitle.textContent = month.charAt(0).toUpperCase() + month.slice(1)

    // Show image view, hide calendar view
    showImageView()
  }

  // Function to show image view
  function showImageView() {
    calendarView.classList.add("hidden")
    imageView.classList.remove("hidden")
  }

  // Function to show calendar view
  function showCalendarView() {
    imageView.classList.add("hidden")
    calendarView.classList.remove("hidden")

    // Clear the image source to stop it from loading in the background
    monthImage.src = ""
  }

  // Handle image loading errors
  monthImage.addEventListener("error", function () {
    this.src = "/placeholder.svg?height=800&width=600"
    this.alt = "Calendar image not found"
    console.log("Image failed to load. Using placeholder instead.")
  })

  // Check window size on load to set initial sidebar state
  if (window.innerWidth > 768) {
    // Start with sidebar visible on desktop
    sidebar.classList.remove("collapsed")
  } else {
    // Start with sidebar hidden on mobile
    sidebar.classList.remove("active")
  }
})

