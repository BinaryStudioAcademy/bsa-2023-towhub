// import { Badge, Button } from '~/libs/components/components.js';
import { Button } from '~/libs/components/components.js';

type Properties = {
  onSubmit: () => void;
};

const SignInForm: React.FC<Properties> = () => (
  <>
    <h1>Sign In</h1>
    {/* <Badge>{'free'}</Badge>
    <Badge color="red-dark" onClick={handleClick}>
      {'free'}
    </Badge>
    <div>
      <Badge color="blue-dark">{'free'}</Badge>
      <Badge color="black">{'free'}</Badge>
      <Badge color="grey">{'free'}</Badge>
      <Badge color="red">{'free'}</Badge>
      <Badge color="blue">{'free'}</Badge>
      <Badge color="white">{'free'}</Badge>
      <Badge color="grey-dark">{'free'}</Badge>
      <Badge color="red-light">{'free'}</Badge>
      <Badge color="blue-light">{'free'}</Badge>
      <Badge color="grey-light">{'free'}</Badge>
      <Badge color="grey-extra-light">{'free'}</Badge>
    </div> */}
    <form>
      <Button label="Sign in" />
    </form>
  </>
);

export { SignInForm };
