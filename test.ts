interface Student {
  name: string;
  age: number;
}

function getStudent(): Student {
  let student = {
    name: "John",
  } as Student;

  return student;
}

console.log(getStudent());
