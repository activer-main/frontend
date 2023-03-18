import React from 'react';
import { TagType } from 'components/Tag';

interface FooType {
  tag: TagType[]
}

function Foo({ tag }: FooType) {
  // useEffect(() => {
  //   console.log(tag);
  // });

  return (
    <div>
      {tag.map((t) => t.text)}
    </div>
  );
}

export default Foo;
