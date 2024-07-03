import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { InjectModel } from '@nestjs/mongoose';
import { User, UserDocument } from './entities/user.entity';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { SignUpDto } from './dto/signup.dto';
import { LoginDto } from './dto/login.dto';
import { UserToken } from './dto/token.entity';
import { Interest } from './entities/interest.entity';

@Injectable()
export class UsersService {
  constructor(@InjectModel(User.name)
  private userModel: Model<UserDocument>,
  private jwtService: JwtService,
  ) {}

  create(createUserInput: CreateUserInput) {
    const createdUser = new this.userModel(createUserInput);
    return createdUser.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findOne(id: string) {
    return this.userModel.findById(id);
  }

  update(id: number, updateUserInput: UpdateUserInput) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }

  async signup(signUpDto: SignUpDto) : Promise<{user: User, token: string }>{
    const {username, email, pass } = signUpDto;

    const hashedPassword = await bcrypt.hash(pass, 10);
    const user = await this.userModel.create({
      username,
      email,
      pass: hashedPassword,
    });

    const token = this.jwtService.sign( { username: user.username, sub: user._id});

    return { user, token };
  }

  async login(LoginDto: LoginDto) : Promise<UserToken>{
    const { email, pass } = LoginDto;

    const user = await this.userModel.findOne({email});
    if (!user) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const isPasswordMatcher = await bcrypt.compare(pass, user.pass);
    if (!isPasswordMatcher) {
      throw new UnauthorizedException('Invalid email or password');
    }

    const token = this.jwtService.sign( { username: user.username, sub: user._id });

    return { user, token};

  }

  async getMyUser(context) {
    const authorization = context.req.headers.authorization;
    if (!authorization) {
      throw new UnauthorizedException('No authorization header');
    }

    const token = authorization.replace('Bearer ', '');
    try {

      // Decodificar el token
      const decoded: any = this.jwtService.verify(token);
      const idUser = decoded.sub;

      // Buscar el usuario en la base de datos
      const user = await this.userModel.findOne({ _id: idUser }).exec();

      if (!user) {
        throw new UnauthorizedException('User not found');
      }

      return user;
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }

  async updateMyUser(updateUserInput: UpdateUserInput, context) {
    const user = await this.getMyUser(context);
    const updatedUser = await this.userModel.findByIdAndUpdate(user._id, updateUserInput, { new: true, runValidators: true});
    return updatedUser;
  }

  async addInterest(interest: Interest, context) {
    const user = await this.getMyUser(context);

    console.log(!user.interests)

    //Si el usuario aún no tiene intereses, se crea un array vacío
    if (!user.interests) {
      user.interests = [interest];
    }
    else {
      user.interests.push(interest);
    }

    await user.save();
    return interest;
  }

  async removeInterest(interest: Interest, context) {
    const user = await this.getMyUser(context);
    user.interests = user.interests.filter((i) => i.keyword !== interest.keyword && i.category !== interest.category);
    await user.save();
    return interest;
  }
}
