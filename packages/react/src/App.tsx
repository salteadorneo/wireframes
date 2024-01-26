import { Avatar } from "../lib/components/Avatar";
import { Button } from "../lib/components/Button";
import { Link } from "../lib/components/Link";
import { Image } from "../lib/components/Image";
import { Lorem } from "../lib/components/Lorem";
import { H1, H2, H3, H4, H5, H6 } from "../lib/components/Heading";
import { P } from "../lib/components/Paragraph";
import { Flex } from "../lib/components/Display";
import { Video } from "../lib/components/Video";

export default function App() {
    return (
        <>
            <Flex>
                <Avatar />
                <P>User</P>
            </Flex>
            <H1><Lorem /></H1>
            <H2><Lorem /></H2>
            <H3><Lorem /></H3>
            <H4><Lorem /></H4>
            <H5><Lorem /></H5>
            <H6><Lorem /></H6>
            <P><Lorem /></P>
            <Link />
            <div>
                <Button />
            </div>
            <Image width={200} />
            <Video width={600} />
        </>
    );
}