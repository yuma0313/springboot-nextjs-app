export async function getAllEmployeeData() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_RESTAPI_URL}employees`, {
    credentials: "include",
  });
  const employees = await res.json();
  return employees;
}

export async function getEmployeeData(id) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_RESTAPI_URL}employees/${id}`,
    {
      credentials: "include",
    }
  );
  const employee = await res.json();
  return employee;
}
