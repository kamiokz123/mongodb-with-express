function confirmDelete(event) {
    const userConfirmed = confirm("Are you sure you want to delete this chat?");
    if (!userConfirmed) {
      event.preventDefault();
      return false;
    }
    return true;
  }

  console.log("working here in script");
  