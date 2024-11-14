import { graphql } from "@graphql";

export const HeadingFragment = graphql(/* GraphQL */ `
  fragment HeadingFragment on HeadingElement {
    HeadingElementHeading: Heading
  }
`);